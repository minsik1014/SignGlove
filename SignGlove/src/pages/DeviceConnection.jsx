import React, { useEffect, useState } from 'react';
import '../styles/DeviceConnection.css';

function DeviceConnection() {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // 기기 목록 불러오기
  useEffect(() => {
    fetch('http://localhost:8000/devices')
      .then(res => res.json())
      .then(data => setDevices(data))
      .catch(err => console.error('기기 목록 오류:', err));
  }, []);

  // 기기 선택 시 상세 정보
  const handleSelectDevice = (deviceId) => {
    setSelectedDeviceId(deviceId);
    setConfirming(false);
    setIsConnected(false);

    fetch(`http://localhost:8000/device/${deviceId}`)
      .then(res => res.json())
      .then(data => {
        setDeviceInfo(data);
        setConfirming(true);
      })
      .catch(err => console.error('기기 정보 오류:', err));
  };

  // 연결 요청
  const connectDevice = () => {
    fetch(`http://localhost:8000/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ device_id: selectedDeviceId })
    })
    .then(res => res.json())
    .then(() => {
      setIsConnected(true);
      setConfirming(false);
    })
    .catch(err => console.error('연결 실패:', err));
  };

  // 연결 해제 요청
  const disconnectDevice = () => {
    fetch(`http://localhost:8000/disconnect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ device_id: selectedDeviceId })
    })
    .then(() => {
      setIsConnected(false);
      setDeviceInfo(null);
      setSelectedDeviceId('');
    })
    .catch(err => console.error('연결 해제 실패:', err));
  };

  return (
    <div className="device-connection-container">
      <h2>🔌 기기 연결</h2>

      <div className="device-select">
        <label htmlFor="device">기기 선택:</label>
        <select
          id="device"
          value={selectedDeviceId}
          onChange={(e) => handleSelectDevice(e.target.value)}
        >
          <option value="">-- 기기를 선택하세요 --</option>
          {devices.map((device) => (
            <option key={device.id} value={device.id}>
              {device.name}
            </option>
          ))}
        </select>
      </div>

      {deviceInfo && (
        <div className="device-info">
          <h3>기기 정보</h3>
          <p><strong>이름:</strong> {deviceInfo.name}</p>
          <p><strong>설명:</strong> {deviceInfo.description}</p>
          <p><strong>배터리:</strong> {deviceInfo.battery}</p>
          <p><strong>상태:</strong> {deviceInfo.status}</p>
        </div>
      )}

      {confirming && !isConnected && (
        <div className="device-confirm">
          <p>이 기기를 연결하시겠습니까?</p>
          <button onClick={connectDevice}>✅ Yes</button>
          <button onClick={() => setConfirming(false)}>❌ No</button>
        </div>
      )}

      {isConnected && (
        <div className="connected-status">
          <p className="success-text">✅ 기기가 연결되었습니다.</p>
          <button onClick={disconnectDevice}>연결 해제</button>
        </div>
      )}
    </div>
  );
}

export default DeviceConnection;
