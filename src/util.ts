/**
 * clap the index to the range of the data array to prevent out of bounds errors
 * @param index
 * @param length
 * @returns number
 */
function clampIndex(index: number, length: number) {
	return Math.max(0, Math.min(index, length - 1));
}
/**
 * filter the data to get the index position of the nearest level dimension
 * @param datums
 * @param pressure
 * @returns SkewT.Datum
 */
function getDatumsAtLevel(datums: SkewT.Datums, pressure: Millibar): SkewT.Datum {
	const level = datums.findIndex((d) => d.pressure === pressure);
	return datums[level];
}

export { clampIndex, getDatumsAtLevel };