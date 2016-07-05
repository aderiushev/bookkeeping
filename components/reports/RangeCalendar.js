import React, { Component, PropTypes } from 'react';
import { DateRange, defaultRanges } from 'react-date-range';
import Toggle from 'material-ui/lib/toggle';
import * as actions from '../../actions';


class RangeCalendar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showCalendar: false
        };
    }

    handleChange(date) {
        console.log(date); // Momentjs object
        actions.getReports();

    };

    showCalendarToggle() {
        this.setState({showCalendar: !this.state.showCalendar});
    }

    render() {
        const { showCalendar } = this.state;

        return (
            <div>
                <div style={{padding: 20}}>
                    <Toggle
                        label='Show/Hide Date Range'
                        onToggle={this.showCalendarToggle.bind(this)}
                        labelPosition='right'
                    />
                </div>
                {showCalendar && <DateRange
                    style={{ textAlign:'center' }}
                    linkedCalendars={ true }
                    ranges={ defaultRanges }
                    onInit={ this.handleChange.bind(this) }
                    onChange={ this.handleChange.bind(this) }
                    theme={{
                      Calendar : { width: 300 },
                      PredefinedRanges : { margin: 10 }
                    }}
                />}
            </div>
        )
    };
}

export default RangeCalendar