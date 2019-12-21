/*
[if you want to invert the X and Z axes, you'd send $2=5 to Grbl and the setting should now read $2=5 (step port invert mask:00000101)]
Value	Mask	    Invert X	Invert Y	Invert Z
0	    00000000	  N	        N	        N
1	    00000001	  Y	        N	        N
2	    00000010	  N	        Y	        N
3	    00000011	  Y       	Y	        N
4	    00000100	  N	        N       	Y
5	    00000101	  Y       	N	        Y
6	    00000110	  N       	Y	        Y
7	    00000111	  Y       	Y	        Y
*/
export enum InvertMask {
  "00000000" = 0,
  "00000001" = 1,
  "00000010" = 2,
  "00000011" = 3,
  "00000100" = 4,
  "00000101" = 5,
  "00000110" = 6,
  "00000111" = 7
}
export enum BooleanMask {
  TRUE = 1,
  FALSE = 0
}
export interface Settings {
  pulseTime: number;
  idleDelay: number;
  portInvertMask: InvertMask;
  directionInvertMark: InvertMask;
  invertEnablePin: BooleanMask;
  invertLimitPin: BooleanMask;
  invertProbePin: BooleanMask;
  statusReportMask: InvertMask;
  deviation: number;
  arcTolerance: number;
  reportInInches: BooleanMask;
  enableSoftLimits: BooleanMask;
  enableHardLimits: BooleanMask;
  enableHomeCycle: BooleanMask;
  homingInvertMask: InvertMask;
  homingFeedRate: number;
  homingSeekRate: number;
  homingDebounceDelay: number;
  homingPullOffDistance: number;
  maxSpindleSpeed: number;
  minSpindleSpeed: number;
  laserMode: BooleanMask;
  xSteps: number;
  ySteps: number;
  zSteps: number;
  xMaxRate: number;
  yMaxRate: number;
  zMaxRate: number;
  xAcceleration: number;
  yAcceleration: number;
  zAcceleration: number;
  xMaxTravel: number;
  yMaxTravel: number;
  zMaxTravel: number;
}
