import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// -----------------------------------------------------------
// SUB-COMPONENT: NewRowModal
// -----------------------------------------------------------
const NewRowModal = ({ show, onClose, headers, onSubmit, editingDoc }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (show) {
            if (editingDoc) {
                setFormData({ ...editingDoc });
            } else {
                const initialData = {};
                headers.forEach(header => {
                    if (header !== '_id') initialData[header] = '';
                });
                setFormData(initialData);
            }
        }
    }, [show, editingDoc, headers]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const dataKeys = Object.keys(formData).filter(k => k !== '_id');
        const hasData = dataKeys.some(key => formData[key] !== '');
        if (!hasData) {
            alert('Please enter some data.');
            return;
        }
        onSubmit(formData);
        onClose();
    };

    if (!show) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white', padding: '20px',
                borderRadius: '8px', width: '450px', maxHeight: '80%',
                overflowY: 'auto', position: 'relative', boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}>
                <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    {editingDoc ? '✏️ Edit Document' : '➕ Add New Document'}
                </h3>
                <div style={{ marginBottom: '15px' }}>
                    {headers.filter(h => h !== '_id').map(header => (
                        <div key={header} style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold', fontSize: '12px', color: '#555' }}>{header}:</label>
                            <input
                                type="text"
                                name={header}
                                value={formData[header] || ''}
                                onChange={handleChange}
                                style={{ width: '95%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #eee' }}>
                    <button onClick={onClose} style={{ padding: '10px 15px', backgroundColor: '#9e9e9e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={handleSubmit} style={{ padding: '10px 15px', backgroundColor: editingDoc ? '#2196f3' : '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        {editingDoc ? 'Update Changes' : 'Save New Row'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// -----------------------------------------------------------
// MAIN COMPONENT: ViewTables.jsx
// -----------------------------------------------------------
export function ViewTables() {
    const [databases, setDatabases] = useState([]);
    const [selectedDb, setSelectedDb] = useState(null);
    const [collections, setCollections] = useState([]);
    const [selectedCol, setSelectedCol] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [totalRows, setTotalRows] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 50; 

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false); // New specific state for uploads
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingDoc, setEditingDoc] = useState(null);

    const [newDbName, setNewDbName] = useState('');
    const [newColName, setNewColName] = useState('');
    const [uploadFile, setUploadFile] = useState(null);
    const [manualHeaders, setManualHeaders] = useState([]);
    const [newColNameInput, setNewColNameInput] = useState('');

    const paginatedDocuments = useMemo(() => {
        if (!Array.isArray(documents)) return [];
        const startIndex = (currentPage - 1) * rowsPerPage;
        return documents.slice(startIndex, startIndex + rowsPerPage);
    }, [documents, currentPage]);

    const totalPages = Math.ceil(documents.length / rowsPerPage);

    const fetchDatabases = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/databases`);
            setDatabases(res.data);
        } catch (err) { setError('Failed to load databases.'); }
    };

    const fetchCollections = async (dbName) => {
        try {
            const res = await axios.get(`${API_BASE_URL}/databases/${dbName}/collections`);
            setCollections(res.data);
        } catch (err) { setError(`Failed to load collections.`); }
    };

    const fetchDocuments = async (dbName, colName) => {
        setLoading(true);
        setCurrentPage(1); 
        try {
            const res = await axios.get(`${API_BASE_URL}/databases/${dbName}/collections/${colName}/documents`);
            if (res.data && res.data.documents) {
                setDocuments(res.data.documents);
                setTotalRows(res.data.totalCount);
            } else if (Array.isArray(res.data)) {
                setDocuments(res.data);
                setTotalRows(res.data.length);
            }
        } catch (err) {
            setDocuments([]);
            setTotalRows(0);
        } finally { setLoading(false); }
    };

    const handleDbClick = (dbName) => {
        if (dbName === selectedDb) {
            setSelectedDb(null); setSelectedCol(null); setCollections([]); setDocuments([]);
        } else {
            setSelectedDb(dbName); setSelectedCol(null); setDocuments([]); fetchCollections(dbName);
        }
    };

    const handleColClick = (colName) => {
        if (colName === selectedCol) {
            setSelectedCol(null); setDocuments([]);
        } else {
            setSelectedCol(colName); fetchDocuments(selectedDb, colName);
        }
    };

    const handleCreateDatabase = async () => {
        if (!newDbName.trim()) return;
        try {
            await axios.post(`${API_BASE_URL}/databases`, { newDbName: newDbName.trim() });
            setNewDbName(''); fetchDatabases();
        } catch (err) { alert("Error creating DB"); }
    };

    const handleDeleteDatabase = async (dbName) => {
        if (!window.confirm(`Delete database "${dbName}"?`)) return;
        try {
            await axios.delete(`${API_BASE_URL}/databases/${dbName}`);
            if (selectedDb === dbName) setSelectedDb(null);
            fetchDatabases();
        } catch (err) { alert("Delete failed"); }
    };

    const handleDeleteCollection = async (colName) => {
        if (!window.confirm(`Delete collection "${colName}"?`)) return;
        try {
            await axios.delete(`${API_BASE_URL}/databases/${selectedDb}/collections/${colName}`);
            if (selectedCol === colName) { setSelectedCol(null); setDocuments([]); }
            fetchCollections(selectedDb);
        } catch (err) { alert("Delete failed"); }
    };

    const handleDeleteDocument = async (docId) => {
        if (!window.confirm(`Delete document?`)) return;
        try {
            await axios.delete(`${API_BASE_URL}/databases/${selectedDb}/collections/${selectedCol}/document/${docId}`);
            fetchDocuments(selectedDb, selectedCol);
        } catch (err) { alert("Delete failed"); }
    };

    const handleFileUpload = async () => {
        if (!uploadFile || !newColName.trim()) {
            return alert("Please select a file and enter a collection name.");
        }
        const formData = new FormData();
        formData.append('file', uploadFile);
        formData.append('colName', newColName.trim());
        try {
            setUploading(true);
            await axios.post(`${API_BASE_URL}/databases/${selectedDb}/collections/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setNewColName(''); setUploadFile(null); 
            fetchCollections(selectedDb);
            alert("File uploaded and collection created!");
        } catch (err) { 
            alert("Upload failed. Ensure the server is running and the collection name is unique."); 
        } finally { setUploading(false); }
    };

    const handleSaveDocument = async (formData) => {
        try {
            if (editingDoc) {
                await axios.put(`${API_BASE_URL}/databases/${selectedDb}/collections/${selectedCol}/document/${editingDoc._id}`, formData);
            } else {
                const cleanData = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v !== ''));
                await axios.post(`${API_BASE_URL}/databases/${selectedDb}/collections/${selectedCol}/document`, cleanData);
            }
            fetchDocuments(selectedDb, selectedCol);
        } catch (err) { alert("Save failed."); }
    };

    const headers = useMemo(() => {
        const fetchedKeys = new Set();
        if (Array.isArray(documents)) {
            documents.forEach(doc => Object.keys(doc).forEach(k => fetchedKeys.add(k)));
        }
        manualHeaders.forEach(h => fetchedKeys.add(h));
        const combined = Array.from(fetchedKeys);
        const idIdx = combined.indexOf('_id');
        if (idIdx > -1) { combined.splice(idIdx, 1); combined.unshift('_id'); }
        return combined;
    }, [documents, manualHeaders]);

    useEffect(() => { fetchDatabases(); }, []);

    const deleteBtnStyle = {
        backgroundColor: '#d32f2f',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '4px 8px',
        cursor: 'pointer'
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
            <h1 style={{ marginBottom: '20px' }}>📁 MongoDB Explorer</h1>
            
            <NewRowModal 
                show={showModal} 
                onClose={() => { setShowModal(false); setEditingDoc(null); }} 
                headers={headers} 
                onSubmit={handleSaveDocument} 
                editingDoc={editingDoc}
                key={editingDoc ? editingDoc._id : 'new'}
            />

            <div style={{ display: 'flex', gap: '20px', height: '80vh' }}>
                
                {/* 1. Databases Sidebar */}
                <div style={{ flex: '0 0 250px', backgroundColor: 'white', borderRadius: '12px', padding: '15px', overflowY: 'auto', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                    <h3>Databases</h3>
                    <div style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
                        <input value={newDbName} onChange={e => setNewDbName(e.target.value)} placeholder="New DB..." style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                        <button onClick={handleCreateDatabase} style={{ padding: '8px', background: '#6200ea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add</button>
                    </div>
                    {databases.map(db => (
                        <div key={db} onClick={() => handleDbClick(db)} style={{ 
                            padding: '10px', margin: '5px 0', 
                            background: selectedDb === db ? '#e0f7fa' : '#f8f9fa', 
                            borderRadius: '6px', cursor: 'pointer',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            border: selectedDb === db ? '1px solid #00bcd4' : '1px solid transparent'
                        }}>
                            <span style={{ fontWeight: selectedDb === db ? 'bold' : 'normal' }}>{db}</span>
                            {selectedDb === db && (
                                <button onClick={(e) => { e.stopPropagation(); handleDeleteDatabase(db); }} style={deleteBtnStyle}>🗑️</button>
                            )}
                        </div>
                    ))}
                </div>

                {/* 2. Collections Sidebar */}
                <div style={{ flex: '0 0 300px', backgroundColor: 'white', borderRadius: '12px', padding: '15px', overflowY: 'auto', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                    <h3>Collections</h3>
                    {selectedDb && (
                        <div style={{ padding: '10px', background: '#f9f9f9', borderRadius: '8px', marginBottom: '15px', border: '1px dashed #ccc' }}>
                            <label style={{ fontSize: '11px', color: '#666' }}>Upload CSV/Excel:</label>
                            <input 
                                type="file" 
                                onChange={e => setUploadFile(e.target.files[0])} 
                                style={{ fontSize: '12px', width: '100%', marginBottom: '5px' }} 
                            />
                            <input 
                                value={newColName} 
                                onChange={e => setNewColName(e.target.value)} 
                                placeholder="New Collection Name" 
                                style={{ width: '90%', padding: '5px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }} 
                            />
                            <button 
                                onClick={handleFileUpload}
                                disabled={uploading}
                                style={{ 
                                    width: '100%', 
                                    background: uploading ? '#ccc' : '#ff9800', 
                                    color: 'white', 
                                    border: 'none', 
                                    padding: '8px', 
                                    borderRadius: '4px',
                                    cursor: uploading ? 'not-allowed' : 'pointer',
                                    fontWeight: 'bold'
                                }}
                            >
                                {uploading ? '⌛ Uploading...' : '⬆️ Upload & Create'}
                            </button>
                        </div>
                    )}
                    {selectedDb && collections.map(col => (
                        <div key={col} onClick={() => handleColClick(col)} style={{ 
                            padding: '10px', margin: '5px 0', 
                            background: selectedCol === col ? '#fff3e0' : '#f8f9fa', 
                            borderRadius: '6px', cursor: 'pointer',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            border: selectedCol === col ? '1px solid #ff9800' : '1px solid transparent'
                        }}>
                            <span>{col}</span>
                            {selectedCol === col && (
                                <button onClick={(e) => { e.stopPropagation(); handleDeleteCollection(col); }} style={deleteBtnStyle}>🗑️</button>
                            )}
                        </div>
                    ))}
                </div>

                {/* 3. Data Table */}
                <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                    <div style={{ padding: '15px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ margin: 0 }}>Table: {selectedCol || 'None'}</h3>
                            {selectedCol && <small style={{ color: '#666' }}>Showing {paginatedDocuments.length} of {totalRows} rows</small>}
                        </div>
                        {selectedCol && (
                            <button onClick={() => setShowModal(true)} style={{ padding: '8px 16px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>➕ Add Row</button>
                        )}
                    </div>

                    <div style={{ flex: 1, overflow: 'auto' }}>
                        {loading ? <p style={{ padding: '20px' }}>Loading data...</p> : (
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                                <thead style={{ position: 'sticky', top: 0, background: '#f8f9fa', zIndex: 10 }}>
                                    <tr>
                                        <th style={{ padding: '12px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>Actions</th>
                                        {headers.map(h => <th key={h} style={{ padding: '12px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>{h}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedDocuments.map(doc => (
                                        <tr key={doc._id} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: '8px', whiteSpace: 'nowrap' }}>
                                                <button onClick={() => { setEditingDoc(doc); setShowModal(true); }} style={{ marginRight: '5px', border: 'none', background: '#2196f3', color: 'white', borderRadius: '3px', padding: '4px 8px', cursor: 'pointer' }}>Edit</button>
                                                <button onClick={() => handleDeleteDocument(doc._id)} style={{ border: 'none', background: '#f44336', color: 'white', borderRadius: '3px', padding: '4px 8px', cursor: 'pointer' }}>Del</button>
                                            </td>
                                            {headers.map(h => (
                                                <td key={h} style={{ padding: '12px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {typeof doc[h] === 'object' ? JSON.stringify(doc[h]) : String(doc[h] || '')}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {selectedCol && totalPages > 1 && (
                        <div style={{ padding: '10px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', background: '#fff' }}>
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} style={{ padding: '5px 10px', cursor: currentPage === 1 ? 'default' : 'pointer' }}>Prev</button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} style={{ padding: '5px 10px', cursor: currentPage === totalPages ? 'default' : 'pointer' }}>Next</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}