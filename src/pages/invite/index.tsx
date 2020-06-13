import { APP_NAME, COPYRIGHT } from '@/const/app';
import React, { useCallback, useState } from 'react';

import { Button } from 'antd'
import { HeartFilled } from '@ant-design/icons';
import InviteModal from './InviteModal';
import styles from './index.less';

export default function() {
  const [visible, setVisible] = useState(false)

  const onClick = useCallback(() => {
   setVisible(true)
  }, [])
  const handleOk = useCallback(() => {
    setVisible(false);
  }, [])
  const handleCancel = useCallback(() => {
    setVisible(false);
  }, [])

  return (
    <div className={styles.invite}>
      <div className={styles.header}>{APP_NAME}</div>
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.title}>
            <h1>
              <div>A better way</div>
              <div>to enjoy every day.</div>
            </h1>
          </div>
          <div className={styles.subTitle}>
            Be the first to know when we launch.
          </div>
          <Button onClick={onClick} size="large">Request an invite</Button>
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          Made with <HeartFilled /> Melbourne
        </div>
        <div>
          { COPYRIGHT }
        </div>
      </div>

      <InviteModal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  );
}
