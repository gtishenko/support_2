import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {
    Snackbar,
    Panel,
    PanelHeader
} from "@vkontakte/vkui";

import Icon16ErrorCircleFill from '@vkontakte/icons/dist/16/error_circle_fill';
import Icon20CheckCircleFillGreen from '@vkontakte/icons/dist/20/check_circle_fill_green';

class HomePanelBase extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            snackbar: null,
            number: '',
            name: '',
            text: ''
        };

        this.showError = this.showError.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
    }

    showError(text) {
        if (this.state.snackbar) return;
        this.setState({ snackbar:
        <Snackbar
            layout="vertical"
            style={{ padding: 0 }}
            onClose={() => this.setState({ snackbar: null })}
            before={<Icon16ErrorCircleFill width={24} height={24} />}
        >
            {text}
        </Snackbar>
        });
    }

    showSuccess(text) {
        if (this.state.snackbar) return;
        this.setState({ snackbar:
        <Snackbar
            layout="vertical"
            style={{ padding: 0 }}
            onClose={() => this.setState({ snackbar: null })}
            before={<Icon20CheckCircleFillGreen width={24} height={24} />}
        >
            {text}
        </Snackbar>
        });
    }

    componentDidMount() {
        fetch('https://evgrg.000webhostapp.com/testapi.php?action=getAll').then(response => response.text())
        .then((data) => {
            data = JSON.parse(data);
            console.log(data);
        });
    }
    render() {
        const {id, setPage, withoutEpic} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Список обращений</PanelHeader>
                
                {this.state.snackbar}
            </Panel>
        );
    }

}

const mapDispatchToProps = {
    setPage,
    goBack,
    openPopout,
    closePopout,
    openModal
};

export default connect(null, mapDispatchToProps)(HomePanelBase);
