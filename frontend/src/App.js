import './App.css';
import InventoryChart from './components/InventoryChart';
import SalesChart from './components/SalesChart';
function App() {
  return (
    <div style={{ display: 'flex',flexDirection:"column", justifyContent: 'center', alignItems: 'center' }}>
        <h1>Inventario</h1>
        < InventoryChart></InventoryChart>        

        <h1>Ventas</h1>
        < SalesChart></SalesChart>        
      
    </div>
  );
}

export default App;
