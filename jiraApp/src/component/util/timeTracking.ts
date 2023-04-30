const calculateTrackingBarWidth = (timeSpent, timeRemaining, estimate) => {
  if (!timeSpent) {
    return 0;
  }
  if (isNil(timeRemaining) && isNil(estimate)) {
    return 100;
  }
  if (!isNil(estimate)) {
    return Math.max((estimate / timeSpent) * 100, 100);
  }
  if (!isNil(timeRemaining)) {
    return (timeSpent / (timeSpent + timeRemaining)) * 100;
  }
};

const renderRemainingOrEstimate = (timeRemaining, estimate) => {
  // if (timeRemaining === null && estimate === null) {
  //   return null
  // }
  if (timeRemaining) {
    if (estimate) {
      return <div>{`${estimate}h estimated`}</div>;
    }
    return <div>{`${timeRemaining}h remaining`}</div>;
  }
  return null;
};
