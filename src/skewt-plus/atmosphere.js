import * as math from "./math.js";

// Gas constant for dry air at the surface of the Earth
const Rd = 287;
// Specific heat at constant pressure for dry air
const Cpd = 1005;
// Molecular weight ratio
const epsilon = 18.01528 / 28.9644;
// Heat of vaporization of water
const Lv = 2501000;
// Ratio of the specific gas constant of dry air to the specific gas constant for water vapour
const satPressure0c = 6.112;
// C + celsiusToK -> K
const celsiusToK = 273.15;
const L = -6.5e-3;
const g = 9.80665;

/**
 * Computes the temperature at the given pressure assuming dry processes.
 *
 * t0 is the starting temperature at p0 (degree Celsius).
 */
export function dryLapse(p, tK0, p0) {
  return tK0 * Math.pow(p / p0, Rd / Cpd);
}


//to calculate isohume lines:
//1.  Obtain saturation vapor pressure at a specific temperature = partial pressure at a specific temp where the air will be saturated.
//2.  Mixing ratio:  Use the partial pressure where air will be saturated and the actual pressure to determine the degree of mixing,  thus what % of air is water.
//3.  Having the mixing ratio at the surface,  calculate the vapor pressure at different pressures.
//4.  Dewpoint temp can then be calculated with the vapor pressure.

// Computes the mixing ration of a gas.
export function mixingRatio(partialPressure, totalPressure, molecularWeightRatio = epsilon) {
  return (molecularWeightRatio * partialPressure) / (totalPressure - partialPressure);
}

// Computes the saturation mixing ratio of water vapor.
function saturationMixingRatio(p, tK) {
  return mixingRatio(saturationVaporPressure(tK), p);
}

// Computes the saturation water vapor (partial) pressure
export function saturationVaporPressure(tK) {
  const tC = tK - celsiusToK;
  return satPressure0c * Math.exp((17.67 * tC) / (tC + 243.5));
}

// Computes the temperature gradient assuming liquid saturation process.
export function moistGradientT(p, tK) {
  const rs = saturationMixingRatio(p, tK);
  const n = Rd * tK + Lv * rs;
  const d = Cpd + (Math.pow(Lv, 2) * rs * epsilon) / (Rd * Math.pow(tK, 2));
  return (1 / p) * (n / d);
}

// Computes water vapor (partial) pressure.
export function vaporPressure(p, mixing) {
  return (p * mixing) / (epsilon + mixing);
}

// Computes the ambient dewpoint given the vapor (partial) pressure.
export function dewpoint(p) {
  const val = Math.log(p / satPressure0c);
  return celsiusToK + (243.5 * val) / (17.67 - val);
}

export function getElevation(p, p0=1013.25) {
  const t0 = 288.15;
  //const p0 = 1013.25;
  return (t0 / L) * (Math.pow(p / p0, (-L * Rd) / g) - 1);
}

export function getElevation2(p, refp=1013.25){   //pressure altitude with NOAA formula  (https://en.wikipedia.org/wiki/Pressure_altitude)
    return    145366.45 * (1 - Math.pow(p/ refp, 0.190284) ) / 3.28084 ;
}

export function pressureFromElevation(e, refp=1013.25){
    e = e*3.28084;
    return Math.pow((-(e/145366.45 - 1)), 1/0.190284) * refp;
}

export function getSurfaceP(surfElev, refElev = 110.8, refP = 1000){  //calculate surface pressure at surfelev,   from reference elev and ref pressure.
    let expectElev = getElevation2(refP);
    let elevD = surfElev - refElev;
    return pressureFromElevation(elevD, refP);
}


export function parcelTrajectory(params, steps, sfcT, sfcP, sfcDewpoint) {

  //remove invalid or NaN values in params
  for (let i=0;  i< params.temp.length; i++){
    let inval=false;
    for (let p in params) if (!params[p][i] && params[p][i]!==0) inval=true;
    if (inval) for (let p in params) params[p].splice(i,1);
  }

  //console.log(params,steps, sfcT,sfcP,sfcDewpoint);

  const parcel = {};
  const dryGhs = [];
  const dryPressures = [];
  const dryTemps = [];  //dry temps from surface temp,  which can be greater than templine start
  const dryDewpoints = [];
  const dryTempsTempline = []; //templine start

  const mRatio = mixingRatio(saturationVaporPressure(sfcDewpoint), sfcP);

  const pToEl = math.scaleLog(params.level, params.gh);
  const minEl = pToEl(sfcP);
  const maxEl = Math.max(minEl, params.gh[params.gh.length - 1]);
  const stepEl = (maxEl - minEl) / steps;

  const moistLineFromEandT = (elevation, t) => {
  //this calculates a moist line from elev and temp to the intersection of the temp line if the intersection exists otherwise very high cloudtop
    const moistGhs=[], moistPressures=[], moistTemps=[];
    let previousP = pToEl.invert(elevation);
    for (; elevation < maxEl + stepEl; elevation += stepEl) {
      const p = pToEl.invert(elevation);
      t = t + (p - previousP) * moistGradientT(p, t);
      previousP = p;
      moistGhs.push(elevation);
      moistPressures.push(p);
      moistTemps.push(t);
    }
    let moist = math.zip(moistTemps, moistPressures);
    let cloudTop, pCloudTop;
    const equilibrium = math.firstIntersection(moistGhs, moistTemps, params.gh, params.temp);
    if (equilibrium) {
        cloudTop = equilibrium[0];
        pCloudTop = pToEl.invert(equilibrium[0]);
        moist = moist.filter((pt) => pt[1] >= pCloudTop);
        moist.push([equilibrium[1], pCloudTop]);
    } else { //does not intersect,  very high CBs
        cloudTop = 100000;
        pCloudTop = pToEl.invert(cloudTop);
    }
    return {moist, cloudTop, pCloudTop};
  }


  for (let elevation = minEl; elevation <= maxEl; elevation += stepEl) {
    const p = pToEl.invert(elevation);
    const t = dryLapse(p, sfcT, sfcP);
    const dp = dewpoint(vaporPressure(p, mRatio));
    dryGhs.push(elevation);
    dryPressures.push(p);
    dryTemps.push(t);        //dry adiabat line from templine surfc
    dryDewpoints.push(dp);   //isohume line from dewpoint line surfc

    const t2 =  dryLapse(p, params.temp[0], sfcP);
    dryTempsTempline.push(t2);
  }

  const cloudBase = math.firstIntersection(dryGhs, dryTemps, dryGhs, dryDewpoints);
  //intersection dry adiabat from surface temp to isohume from surface dewpoint,  if dp==surf temp,  then cloudBase will be null

  let thermalTop = math.firstIntersection(dryGhs, dryTemps, params.gh, params.temp);
  //intersection of dryadiabat from surface to templine.  this will be null if stable,  leaning to the right

  let LCL = math.firstIntersection(dryGhs, dryTempsTempline, dryGhs, dryDewpoints);
  //intersection dry adiabat from surface temp to isohume from surface dewpoint,  if dp==surf temp,  then cloudBase will be null

  let CCL=math.firstIntersection(dryGhs, dryDewpoints, params.gh, params.temp);
  //console.log(CCL, dryGhs, dryDewpoints, params.gh, params.temp );
  //intersection of isohume line with templine


  //console.log(cloudBase, thermalTop, LCL, CCL);

  if (LCL && LCL.length){
    parcel.LCL=LCL[0];
    let LCLp = pToEl.invert(LCL[0]);
    parcel.isohumeToDry =[].concat(
        math.zip(dryTempsTempline, dryPressures).filter(p => p[1] >= LCLp),
        [[LCL[1],LCLp]],
        math.zip(dryDewpoints, dryPressures).filter(p => p[1] >= LCLp).reverse()
    );
  }

  if (CCL && CCL.length){
    //parcel.CCL=CCL[0];
    let CCLp=pToEl.invert(CCL[0]);
    parcel.TCON=dryLapse(sfcP,CCL[1],CCLp);

    //check if dryTempsTCON crosses temp line at CCL,  if lower,  then inversion exists and TCON,  must be moved.
   /* const calcDryTempsTCON = () =>{
        let a = [];
        for (let elevation = minEl; elevation <= maxEl; elevation += stepEl) {  //line from isohume/temp intersection to TCON
            const t = dryLapse(pToEl.invert(elevation), parcel.TCON, sfcP);
            a.push(t);
        }
        return a;
    }  */

    let dryTempsTCON,  crossTemp = [-Infinity];
    for (; crossTemp[0] < CCL[0]; parcel.TCON+=0.5){
        dryTempsTCON = [];
        for (let elevation = minEl; elevation <= maxEl; elevation += stepEl) {  //line from isohume/temp intersection to TCON
            const t = dryLapse(pToEl.invert(elevation), parcel.TCON, sfcP);
            dryTempsTCON.push(t);
        }
        crossTemp = math.firstIntersection(dryGhs, dryTempsTCON, params.gh, params.temp) ;
    }

    parcel.TCON-=0.5;
    if (crossTemp[0] > CCL[0]) {
        CCL = math.firstIntersection(dryGhs, dryTempsTCON, dryGhs, dryDewpoints);
    }
    parcel.CCL=CCL[0];
    CCLp=pToEl.invert(CCL[0]);

    parcel.isohumeToTemp =[].concat(
        math.zip(dryDewpoints, dryPressures).filter(p => p[1] >= CCLp),
        [[CCL[1],CCLp]],
        math.zip(dryTempsTCON, dryPressures).filter(p => p[1] >= CCLp).reverse()
    );
    parcel.moistFromCCL = moistLineFromEandT(CCL[0],CCL[1]).moist;
  }

  parcel.surface = params.gh[0];


  if (!thermalTop) {
    return parcel;
  } else {
      parcel.origThermalTop=thermalTop[0];
  }

  if (thermalTop && cloudBase && cloudBase[0] < thermalTop[0]) {

    thermalTop = cloudBase;

    const pCloudBase = pToEl.invert(cloudBase[0]);

    Object.assign(
        parcel,
        moistLineFromEandT(cloudBase[0],cloudBase[1])   //add to parcel: moist = [[moistTemp,moistP]...],  cloudTop and pCloudTop.
    );

    const isohume = math.zip(dryDewpoints, dryPressures).filter((pt) => pt[1] > pCloudBase); //filter for pressures higher than cloudBase,  thus lower than cloudBase
    isohume.push([cloudBase[1], pCloudBase]);



    //parcel.pCloudTop = params.level[params.level.length - 1];



    //parcel.cloudTop = cloudTop;
    //parcel.pCloudTop = pCloudTop;

    //parcel.moist = moist;

    parcel.isohume = isohume;

  }

  let pThermalTop = pToEl.invert(thermalTop[0]) ;
  const dry = math.zip(dryTemps, dryPressures).filter((pt) => pt[1] > pThermalTop);
  dry.push([thermalTop[1], pThermalTop]);

  parcel.dry = dry;
  parcel.pThermalTop = pThermalTop;
  parcel.elevThermalTop = thermalTop[0];



  //console.log(parcel);
  return parcel;
}