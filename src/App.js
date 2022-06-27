import Invoices from "./components/Invoices";
import { Button } from "antd";
import { useState } from "react";
import CreateInvoice from "./components/CreateInvoice";
import "./App.css";

function App() {
  const [createInvoice, setCreateInvoice] = useState(false);

  const toggleCreateInvoice = (value) => {
    setCreateInvoice(value);
  };

  return (
    <div>
      <div class="btn-header">
        <Button onClick={() => toggleCreateInvoice(false)} type="primary">
          Invoices
        </Button>
        <Button onClick={() => toggleCreateInvoice(true)} type="primary">
          Create Invoice
        </Button>
      </div>
      {createInvoice ? (
        <div>
          <CreateInvoice />
        </div>
      ) : (
        <div>
          <Invoices />
        </div>
      )}
    </div>
  );
}

export default App;
