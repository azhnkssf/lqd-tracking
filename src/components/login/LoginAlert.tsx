import { Alert, CloseButton } from '@heroui/react';
import { IcoAlert, IcoClose } from './icons';

type LoginAlertProps = {
  message: string;
  shake: boolean;
  onClose: () => void;
};

export default function LoginAlert({ message, shake, onClose }: LoginAlertProps) {
  return (
    <Alert
      status="danger"
      className={['login-alert', shake ? 'shake' : ''].join(' ')}
    >
      <Alert.Indicator className="login-alert__indicator">
        <IcoAlert />
      </Alert.Indicator>

      <Alert.Content className="!min-w-0 !flex-1 !gap-1">
        <Alert.Title className="text-[12px] font-bold leading-[17px] text-red-800">
          ไม่สามารถเข้าสู่ระบบได้
        </Alert.Title>
        <Alert.Description className="text-[12px] font-medium leading-[17px] text-red-700">
          {message}
        </Alert.Description>
      </Alert.Content>

      <CloseButton
        aria-label="Dismiss error"
        className="login-alert__close"
        onPress={onClose}
      >
        <IcoClose />
      </CloseButton>
    </Alert>
  );
}
