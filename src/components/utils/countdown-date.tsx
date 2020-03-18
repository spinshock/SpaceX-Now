import React, { Component, ReactElement } from 'react';
import moment, { Moment } from 'moment';

type CountdownDateProps = {
    date: Date;
    format: string;
};

type CountdownDateState = {
    date: Moment;
    isCountdown: boolean;
};

export default class CountdownDate extends Component<
    CountdownDateProps,
    CountdownDateState
> {
    public countdown: string;
    private countdownTimer!: NodeJS.Timeout;

    constructor(props: CountdownDateProps) {
        super(props);
        this.state = {
            date: moment(props.date, props.format),
            isCountdown: false,
        };
        this.countdown = '00:00:00';
        this.tick();
    }

    componentWillUnmount(): void {
        clearInterval(this.countdownTimer);
    }

    isPast(): boolean {
        return !this.state.date.isBefore(moment());
    }

    tick(): void {
        this.countdown = moment
            .utc(this.state.date.diff(moment()))
            .format('DD:HH:mm:ss');
        this.setState({ ...this.state });
    }

    startTimer(): void {
        this.countdownTimer = setInterval(this.tick.bind(this), 1000);
        this.tick();
    }

    handleDateClick(): void {
        clearInterval(this.countdownTimer);
        if (!this.state.isCountdown) {
            this.startTimer();
        }
        this.setState({
            ...this.state,
            isCountdown: !this.state.isCountdown,
        });
    }

    render(): ReactElement {
        return (
            <>
                <span onClick={this.handleDateClick.bind(this)}>
                    {this.state.isCountdown && this.isPast()
                        ? this.countdown
                        : this.state.date.format(this.props.format)}
                </span>
            </>
        );
    }
}
