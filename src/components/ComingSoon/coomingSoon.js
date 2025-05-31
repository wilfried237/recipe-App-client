import Footer from "../footer/Footer"
import React, {useState, useEffect} from "react";
export default function CoomingSoon(){
    const [countdown, setCountdown] = useState({
        days: 10,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      let timer;
    
      useEffect(() => {
        const timer = setInterval(() => {
          updateCountdown();
        }, 1000);
    
        return () => clearInterval(timer);
      }, [countdown]);
    
      const updateCountdown = () => {
        let { days, hours, minutes, seconds } = countdown;
    
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              if (days === 0) {
                clearInterval(timer);
                return;
              }
              days--;
              hours = 23;
            } else {
              hours--;
              minutes = 59;
            }
            seconds = 59;
          } else {
            minutes--;
            seconds = 59;
          }
        } else {
          seconds--;
        }
    
        setCountdown({ days, hours, minutes, seconds });
      };
    
      return (
        <>
        <div
          style={{
            backgroundColor: 'white',
            height: '100vh',
          }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center h-100">
            <h1
              className="display-1 mb-4 animate__animated animate__bounce animate__infinite"
              style={{
                color: 'rgb(255, 100, 47)',
              }}
            >
              Coming Soon
            </h1>
            <div className="fs-2 mb-5">
              <span
                className="bg-white text-dark px-3 py-2 rounded mx-2"
                style={{
                  color: 'rgb(255, 100, 47)',
                }}
              >
                {countdown.days}
              </span>
              <span
                className="bg-white text-dark px-3 py-2 rounded mx-2"
                style={{
                  color: 'rgb(255, 100, 47)',
                }}
              >
                {countdown.hours.toString().padStart(2, '0')}
              </span>
              <span
                className="bg-white text-dark px-3 py-2 rounded mx-2"
                style={{
                  color: 'rgb(255, 100, 47)',
                }}
              >
                {countdown.minutes.toString().padStart(2, '0')}
              </span>
              <span
                className="bg-white text-dark px-3 py-2 rounded mx-2"
                style={{
                  color: 'rgb(255, 100, 47)',
                }}
              >
                {countdown.seconds.toString().padStart(2, '0')}
              </span>
            </div>
            <p
              className="text-center"
              style={{
                color: 'rgb(255, 100, 47)',
              }}
            >
              Get ready for something amazing!
            </p>
          </div>
        </div>
        <Footer/>      
        </>

      );
} 