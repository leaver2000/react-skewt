enum BASE_PARAMETERS {
  // base parameters
  // < TEMPERATURE >
  DEW_POINT = "2m_agl_dpt",
  RELATIVE_HUMIDITY = "2m_agl_rh",
  TEMPERATURE = "2m_agl_tmp",
  TEMPERATURE_DEVIATION = "2m_agl_temp_d",
  WET_BULB_TEMPERATURE = "2m_agl_wbt",
  // < SEVERE WEATHER >

  PRECIPITATION_RATE = "1_hr_precip",
}
enum WIND_PARAMETERS {
  WIND_DIRECTION = "10m_agl_spd",
  WIND_DIRECTION_AT_600M_AGL = "600m_agl_dir",
  WIND_SPEED = "10m_agl_dir",
  WIND_SPEED_AT_600M_AGL = "600m_agl_spd",
  WIND_SHEAR_AT_6KM = "6km_shear",
  CROSS_WIND_ONE = "xwind1",
  CROSS_WIND_TWO = "xwind2",
}

enum CLOUD_PARAMETERS {
  CLOUD_BASE_ONE = "cloud_base1",
  CLOUD_BASE_TWO = "cloud_base2",
  CLOUD_BASE_THREE = "cloud_base3",
  CLOUD_BASE_FOUR = "cloud_base4",
  CLOUD_BASE_FIVE = "cloud_base5",
  CLOUD_COVER_ONE = "cloud_cover1",
  CLOUD_COVER_TWO = "cloud_cover2",
  CLOUD_COVER_THREE = "cloud_cover3",
  CLOUD_COVER_FOUR = "cloud_cover4",
  CLOUD_COVER_FIVE = "cloud_cover5",
}

enum SEVERE_WEATHER_PARAMETERS {
  STORM_RELATIVE_HELICITY_SURFACE_TO_1K = "0_1km_srh",
  STORM_RELATIVE_HELICITY_SURFACE_TO_2K = "0_2km_srh",
  STORM_RELATIVE_HELICITY_SURFACE_TO_3K = "0_3km_srh",
  EFFECTIVE_HELICITY = "0_1km_ehi",
}

enum PROBABILITY_PARAMETERS {
  PROBABILITY_OF_MIXED_PRECIPITATION = "prob_mix",
  PROBABILITY_OF_ANY_PRECIPITATION = "prob_any_precip",
  PROBABILITY_OF_FREEZING_RAIN = "prob_fzra",
  PROBABILITY_OF_RAIN = "prob_ra",
  PROBABILITY_OF_SNOW = "prob_sn",
  PROBABILITY_OF_SNOW_GRAINS = "prob_rasn",
  PROBABILITY_OF_THUNDERSTORMS = "prob_tstm",
}
enum THICKNESS_PARAMETERS {
  THICKNESS_850MB_TO_500MB = "850_500_thkns",
  THICKNESS_850MB_TO_700MB = "850_700_thkns",
}
export const SURFACE_PARAMETERS = {
  ...BASE_PARAMETERS,
  ...WIND_PARAMETERS,
  ...PROBABILITY_PARAMETERS,
  ...SEVERE_WEATHER_PARAMETERS,
  ...THICKNESS_PARAMETERS,
  ...CLOUD_PARAMETERS,
} as const;

export type SurfaceParameterType = keyof typeof SURFACE_PARAMETERS;
export type SurfaceParameterValue =
  typeof SURFACE_PARAMETERS[SurfaceParameterType];

// 	"0_4km_vgp",

// 	"600m_agl_dir",
// 	"600m_agl_spd",
// 	"6km_shear",
// 	"850_500_thkns",
// 	"850_700_thkns",
// 	"altimeter",
// 	"brn",
// 	"convect_temp",
// 	"density_alt",
// 	"dta_visibility",
// 	"eff_srh",
// 	"fits",
// 	"fm_hail_index",
// 	"freezing_level",
// 	"freezing_press",
// 	"hail_size",
// 	"heat_index",
// 	"lid_strength",
// 	"lightning_prob",
// 	"llws_prob",
// 	"lowest_cig",
// 	"max_hail_size",
// 	"max_icing_blw_10k",
// 	"max_turb_blw_10k",
// 	"mean_slp",
// 	"minus_20c_height",
// 	"minus_20c_pressure",
// 	"ml_cape",
// 	"ml_ccl_height",
// 	"ml_ccl_press",
// 	"ml_ccl_temp",
// 	"ml_cinh",
// 	"mu_cape",
// 	"mu_cinh",
// 	"mu_eq_level",
// 	"mu_eq_lvl_prs",
// 	"mu_eq_lvl_tmp",
// 	"mu_height",
// 	"mu_ko",
// 	"mu_lcl_height",
// 	"mu_lcl_p_temp",
// 	"mu_lcl_press",
// 	"mu_lcl_temp",
// 	"mu_level",
// 	"mu_lfc",
// 	"mu_lfc_prs",
// 	"mu_lfc_tmp",
// 	"mu_li",
// 	"mu_temperature",
// 	"mu_thi",
// 	"mu_tti",
// 	"noncv_gust_dir",
// 	"noncv_gust_spd",
// 	"noncv_precip_type",
// 	"parcel_temp",
// 	"precip_water",
// 	"press_alt",
// 	"ram_hail_index",
// 	"sfc_lcl_height",
// 	"sfc_lcl_press",
// 	"sfc_lcl_temp",
// 	"sfc_prs",
// 	"sig_hail_parameter",
// 	"sig_torn_parameter",
// 	"ssi",
// 	"sweat_index",
// 	"tornado_prob",
// 	"total_clouds",
// 	"vil_d_hail",
// 	"visibility",
// 	"wet_bulb_zero",
// 	"wind_chill",
// 	"xwind1",
// 	"xwind2"
// ]
