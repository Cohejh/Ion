import * as React from 'react';

import { Title, Row, Control, Header } from '../App/style';
import store from '../../store';
import { BLUE_500 } from '~/renderer/constants';
import { Button } from '~/renderer/components/Button';
import { observer } from 'mobx-react-lite';
import { Switch } from '~/renderer/components/Switch';
import { NormalButton } from '../App';
import { ipcRenderer, ipcMain } from 'electron';

const onClick = async () => {
  await ipcRenderer.invoke('set-default-browser');
};

ipcMain.handle('set-default-browser', async () => {
  if (
    !(
      app.isDefaultProtocolClient('http') &&
      app.isDefaultProtocolClient('https')
    )
  ) {
    app.setAsDefaultProtocolClient('http');
    app.setAsDefaultProtocolClient('https');
  }
});



export const General = observer(() => {
  return (
    <>
      <Header>General</Header>
      <Row>
          <Title>Default Browser</Title>
        <Control>
        <Button
        type="outlined"
        foreground={BLUE_500}
        onClick={onClick}
        >
        Set as default browser
        </Button>
        </Control>
      </Row>
    </>
  );
});