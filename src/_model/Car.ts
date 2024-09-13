export interface Car{
  car_ID: bigint;         
  symboling?: bigint | null;
  CarName?: string | null;
  fueltype?: string | null;
  aspiration?: string | null;
  doornumber?: string | null;
  carbody?: string | null;
  drivewheel?: string | null;
  enginelocation?: string | null;
  wheelbase?: number | null;
  carlength?: number | null;
  carwidth?: number | null;
  carheight?: number | null;
  curbweight?: bigint | null;
  enginetype?: string | null;
  cylindernumber?: string | null;
  enginesize?: bigint | null;
  fuelsystem?: string | null;
  boreratio?: number | null;
  stroke?: number | null;
  compressionratio?: number | null;
  horsepower?: bigint | null;
  peakrpm?: bigint | null;
  citympg?: bigint | null;
  highwaympg?: bigint | null;
  price?: number | null;

}
