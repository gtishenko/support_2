import React from 'react';
import {connect} from 'react-redux';

import {openModal} from "../../store/router/actions";

import {ModalPage, ModalPageHeader, PanelHeaderButton, withPlatform, IOS, Title, Header, Text, Group, Div} from "@vkontakte/vkui";

import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import { Data } from '../../panels/home/base';

class HomeBotsListModal extends React.Component {

    componentDidMount() {
        console.log(Data);
    }

    render() {
        const {id, onClose, openModal, platform} = this.props;

        return (
            <ModalPage
                id={id}
                header={
                    <ModalPageHeader
                        left={platform !== IOS &&
                        <PanelHeaderButton onClick={onClose}><Icon24Cancel/></PanelHeaderButton>}
                        right={platform === IOS &&
                        <PanelHeaderButton onClick={onClose}><Icon24Dismiss/></PanelHeaderButton>}
                    >
                        {"Тикет #" + Data.id}
                    </ModalPageHeader>
                }
                onClose={onClose}
                settlingHeight={80}
            >
                <Group header={<Header mode="primary">Текст обращения</Header>}>
                    <Div>
                        <Text weight="regular">
                            {Data.text}
                        </Text>
                    </Div>
                </Group>
            </ModalPage>
        );
    }

}

const mapDispatchToProps = {
    openModal
};

export default withPlatform(connect(null, mapDispatchToProps)(HomeBotsListModal));
