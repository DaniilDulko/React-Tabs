import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

const Popup = () => {
  const [tabs, setTabs] = useState([]);
  const [activePage, setActivePage] = useState('page1');

  useEffect(() => {
    fetchTabs();

    chrome.tabs.onCreated.addListener(fetchTabs);
    chrome.tabs.onRemoved.addListener(fetchTabs);

    return () => {
      chrome.tabs.onCreated.removeListener(fetchTabs);
      chrome.tabs.onRemoved.removeListener(fetchTabs);
    };
  }, []);

  const fetchTabs = () => {
    chrome.tabs.query({}, (result) => {
      setTabs(result);
    });
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleTabClick = (tabId) => {
    chrome.tabs.update(tabId, { active: true });
  };

  const tabCount = tabs.length;

  return (
    <div>
      <div id="page1" style={{ display: activePage === 'page1' ? 'block' : 'none' }}>
        <h1>Page 1</h1>
        <button onClick={() => handlePageChange('page2')}>Go to Page 2</button>
      </div>
      <div id="page2" style={{ display: activePage === 'page2' ? 'block' : 'none' }}>
        <h1>Page 2</h1>
        <button onClick={() => handlePageChange('page1')}>Go to Page 1</button>
      </div>
      <div id="ext_tabs">
        <h2>Tabs</h2>
        <div id="badge">{tabCount}</div>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {tabs.map((tab) => (
              <tr key={tab.id} onClick={() => handleTabClick(tab.id)}>
                <td>{tab.title}</td>
                <td>
                  <a href={tab.url} target="_blank" rel="noopener noreferrer">
                    {tab.url}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById('root'));
