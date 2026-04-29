export function calcPressureLoss(params: {
  pressurePer100m: number;
  lengthM: number;
  heightDeltaM?: number;
  doubleLine?: boolean;
}) {
  const frictionBase = params.pressurePer100m * (params.lengthM / 100);
  const frictionLoss = params.doubleLine ? frictionBase / 2 : frictionBase;
  const heightLoss = (params.heightDeltaM ?? 0) / 10;
  return Number((frictionLoss + heightLoss).toFixed(2));
}
