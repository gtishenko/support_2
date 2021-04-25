import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {
    Snackbar,
    Panel,
    PanelHeader,
    Group,
    Header,
    PanelSpinner,
    Placeholder,
    Div
} from "@vkontakte/vkui";

import Icon16ErrorCircleFill from '@vkontakte/icons/dist/16/error_circle_fill';
import Icon20CheckCircleFillGreen from '@vkontakte/icons/dist/20/check_circle_fill_green';

var Data = '';

class HomePanelBase extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            snackbar: null,
            requests: [],
            loader: true
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
            this.setState({
                requests: data,
                loader: false
            });
        });
    }
    render() {
        const {id, setPage, withoutEpic} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Админ-панель</PanelHeader>
                {this.state.loader ? <PanelSpinner/> : 
                <Group header={<Header mode="primary">Обращения пользователей</Header>} description="Нажмите на обращение для более подробной информации">
                    {this.state.requests.length === 0 ? <Placeholder header="Обращений нет"></Placeholder> : 
                    <Div>
                        <div style={{ overflowY: 'auto' }}>
                            <table border="1" cellSpacing="0" cellPadding="8px" style={{ backgroundColor: '#f5f5f5', width: '100%', textAlign: 'center' }}>
                                <tbody>
                                        <th>ID обращения</th>
                                        <th>Дата создания</th>
                                        <th>ФИО</th>
                                        <th>Номер телефона</th>
                                    {this.state.requests.map((item) => 
                                        <tr onClick={() => {
                                            Data = item;
                                            this.props.openModal("MODAL_PAGE_BOTS_LIST")
                                        }}>
                                            <td>{item.id}</td>
                                            <td>{item.time}</td>
                                            <td>{item.lastName + ' ' + item.firstName + ' ' + item.middleName}</td>
                                            <td>{item.phone}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Div> }
                </Group>}
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
export var Data;