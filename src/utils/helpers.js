export function updateCountdown(startTime, currency,setTimer,setTimerRef,callback,url) {
 
    const newInterval = setInterval(() => {
      const targetTimestamp = startTime;
      const currentTimestamp = new Date().getTime();
      const timeRemaining = targetTimestamp - currentTimestamp;

      if (timeRemaining <= 0) {
        if(callback){
            setTimer(null);
            callback(currency);
        }else{
          window.location.replace(url);
        }
      } else {

        const remainingHours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        let obj = { remainingSeconds, remainingMinutes, remainingHours }
        setTimer(obj);
      
      }
    }, 1000);

    setTimerRef(newInterval);

}


