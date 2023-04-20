import { motion } from 'framer-motion';
import { DateTime } from 'luxon';
import { CSSProperties, ReactNode, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useCountdown } from '~/hooks/useCountdown';

export interface CountdownTimerProps {
	to: string;
	expiredMessage?: string | null;
	headline?: string | null;
	expiredHeadline?: string | null;
}

export const CountdownTimer = ({ to = '2023-08-11', headline, expiredHeadline, expiredMessage }: CountdownTimerProps): ReactNode => {
  if (to === undefined) {
    throw new Error('`to` prop is required');
  }

  const { years, months, days, hours, minutes, seconds, isLoading } = useCountdown(to);
	const expired = DateTime.fromISO(to) < DateTime.now();
	const displayTo = DateTime.fromISO(to).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
  // const motionValues = {
  // 	years: useMotionValue(0),
  // 	months: useMotionValue(0),
  // 	days: useMotionValue(0),
  // 	hours: useMotionValue(0),
  // 	minutes: useMotionValue(0),
  // 	seconds: useMotionValue(0),
  // }

  // const transformedValues = {
  // 	years: useTransform(motionValues.years, (value) => Math.round(value)),
  // 	months: useTransform(motionValues.months, (value) => Math.round(value)),
  // 	days: useTransform(motionValues.days, (value) => Math.round(value)),
  // 	hours: useTransform(motionValues.hours, (value) => Math.round(value)),
  // 	minutes: useTransform(motionValues.minutes, (value) => Math.round(value)),
  // 	seconds: useTransform(motionValues.seconds, (value) => Math.round(value)),
  // }

  useEffect(() => {
    if (expired) {
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    const secondsEl = document.querySelector('[data-countdown="seconds"]') as HTMLElement;
    const minutesEl = document.querySelector('[data-countdown="minutes"]') as HTMLElement;
    const hoursEl = document.querySelector('[data-countdown="hours"]') as HTMLElement;
    const daysEl = document.querySelector('[data-countdown="days"]') as HTMLElement;
    const monthsEl = document.querySelector('[data-countdown="months"]') as HTMLElement;

		if (secondsEl !== null) secondsEl.style.setProperty('--value', seconds.toString());
		if (minutesEl !== null) minutesEl.style.setProperty('--value', minutes.toString());
		if (hoursEl !== null) hoursEl.style.setProperty('--value', hours.toString());
		if (daysEl !== null) daysEl.style.setProperty('--value', days.toString());
		if (monthsEl !== null) monthsEl.style.setProperty('--value', months.toString());

    // console.log({isLoading, expired, years, months, days, hours, minutes, seconds});

    // const yearsControls = animate(motionValues.years, years)
    // const monthsControls = animate(motionValues.months, months)
    // const daysControls = animate(motionValues.days, days)
    // const hoursControls = animate(motionValues.hours, hours)
    // const minutesControls = animate(motionValues.minutes, minutes)
    // const secondsControls = animate(motionValues.seconds, seconds, {
    // 	duration: 1,
    // 	type: 'spring',
    // })

    // return () => {
    // 	yearsControls.stop()
    // 	monthsControls.stop()
    // 	daysControls.stop()
    // 	hoursControls.stop()
    // 	minutesControls.stop()
    // 	secondsControls.stop()
    // }
  }, [expired, years, months, days, hours, minutes, seconds]);

  return (
		<div className="countdown-timer flex flex-col items-center justify-center text-6xl font-bold">
			{headline && !expired && (<h4 className="text-lg font-normal leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{headline}<br /> <span className="inline-flex uppercase text-off-white font-bold text-2xl -translate-y-2">{displayTo}</span></h4>)}
			{expiredHeadline && expired && (<h4 className="text-lg font-normal leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{expiredHeadline}<br /> <span className="inline-flex uppercase text-off-white font-bold text-2xl -translate-y-2">{displayTo}</span></h4>)}
      {expired ? (
					<ReactMarkdown className="expired-copy">{expiredMessage ?? 'Game on!!'}</ReactMarkdown>
      ) : (
          <motion.div
            className="countdown-timer__counter pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
						viewport={{once: false}}
            transition={{ duration: 1 }}
						>
							{months > 0 && (
            <div className="countdown-timer__counter__item">
              <span className="countdown counter__item__months">
                <span style={{ '--value': 0 } as CSSProperties} data-countdown="months" />
              </span>
              <span>Months</span>
            </div>
							)}
							{days > 0 && (
            <div className="countdown-timer__counter__item">
              <span className="countdown counter__item__days">
                <span style={{ '--value': 0 } as CSSProperties} data-countdown="days" />
              </span>
              <span>Days</span>
            </div>
							)}
            <div className="countdown-timer__counter__item">
              <span className="countdown counter__item__hours">
                <span style={{ '--value': 0 } as CSSProperties} data-countdown="hours" />
              </span>
              <span>Hours</span>
            </div>
            {/* <div className="counter__item__divider">:</div> */}
            <div className="countdown-timer__counter__item">
              <span className="countdown counter__item__minutes">
                <span style={{ '--value': 0 } as CSSProperties} data-countdown="minutes" />
              </span>
              <span>Minutes</span>
            </div>
            {/* <div className="counter__item__divider">:</div> */}
            <div className="countdown-timer__counter__item">
              <span className="countdown counter__item__seconds">
                <span style={{ '--value': 0 } as CSSProperties} data-countdown="seconds" />
              </span>
              <span>Seconds</span>
            </div>
          </motion.div>
      )}
    </div>
  );
};
