import React, { Children, useEffect } from "react";
import axios from "axios";
import { Table, Tag } from "antd";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./Invoices.css";

const { Header, Footer, Sider, Content } = Layout;

const Invoices = () => {
  const [invoices, setInvoices] = React.useState([]);

  const getApi = async () => {
    const response = await axios.get(
      "https://rscdev.taxadda.com/api/invoice/list"
    );
    console.log(response);
    const responseData = response.data;
    const { invoices } = responseData;
    setInvoices(invoices);
  };

  useEffect(() => {
    getApi();
  }, []);
  console.log(invoices);
  //   const response = () => {
  //     axios
  //       .get("https://rscdev.taxadda.com/api/invoice/list")
  //       .then((res) => {
  //         const responseData = res.data.invoices;
  //       })
  //       .catch((err) => console.log(`Error: ${err}`));
  //   };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
    },
    {
      title: "Due-Date",
      dataIndex: "dueDate",
      key: "id",
      render: (t) => {
        t = new Date(t);
        return t.toLocaleDateString("en-US");
      },
    },
    {
      title: "Bill-No.",
      dataIndex: "billNo",
      key: "id",
    },
    {
      title: "Bill Date",
      dataIndex: "billDate",
      key: "id",
      render: (t) => {
        t = new Date(t);
        return t.toLocaleDateString("en-US");
      },
    },
    {
      title: "Gross Amount",
      dataIndex: "grossAmount",
      key: "id",
    },
    {
      title: "GST Amount",
      dataIndex: "gstAmount",
      key: "id",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "id",
    },
    {
      title: "Items",
      dataIndex: "lineItem",
      key: "id",
      render: (lineItems) => {
        console.log(lineItems);
        return (
          <>
            {lineItems?.map((item) => {
              return (
                <Tag>
                  {item.productName} x {item.quantity} = {item.amount}
                </Tag>
              );
            })}
          </>
        );
      },
    },
  ];

  return (
    <Layout>
      <Header>
        <h2 className="header">Invoices</h2>
      </Header>
      <Content style={{ margin: "1rem" }}>
        <Table dataSource={invoices} columns={columns} />
      </Content>
    </Layout>
  );
};

export default Invoices;
