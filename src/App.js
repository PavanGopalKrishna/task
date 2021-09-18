import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { mailData } from "./utils";
import { FlagFilled ,SearchOutlined, DeleteOutlined,FlagOutlined} from '@ant-design/icons';

function App() {
  const [data, setdata] = React.useState([...mailData]);
  const [deleted, setdelete] = React.useState(null);
  const [flag, setFlag] = React.useState([]);
  const [checkBoolean, setCheckBoolean] = React.useState(false);
  const [searchData, setsearchData] = React.useState([...data]);
  const [inboxCount, setInboxCount] = React.useState(data.length);
  const refValue1 = React.useRef("Chethu")

  // React.useEffect(() => {
  //   refValue1.current.focus();
  //   refValue1.current.value = "Chetu"
  // }, []);

  const deleteEmail = (id) => {
    const newMails = data?.filter((item1) => item1.mail != id);
    debugger;
    setdata([...newMails]);
    var checkDelete = 0;
    if (deleted) {
      checkDelete = deleted + 1;
    } else {
      checkDelete = 1;
    }
    setdelete(checkDelete);
  };

  const flagMail = (id) => {
    const newFlagitems = data?.filter((item3) => item3.mail == id.mail);
    const newFlaggedData = data.map((a) => {
      if (a.mail == id.mail) {
        a.flagged = true;
      }
      return a;
    });

    setdata([...newFlaggedData]);
    debugger;
    newFlagitems && setFlag([...flag, ...newFlagitems]);
  };

  const unFlag = (id) => {
    const newFlagitems = flag?.filter((item3) => item3.mail != id.mail);
    const newFlaggedData = data.map((a) => {
      if (a.mail == id.mail) {
        a.flagged = false;
      }
      return a;
    });

    setdata([...newFlaggedData]);
    debugger;
    newFlagitems && setFlag([...newFlagitems]);
  };

  const searchInbox = (value) => {
    value && setCheckBoolean(true);
    !value && setCheckBoolean(false);
    value = value.toLowerCase();
    const newSearchedValue = data?.filter((item2) =>
      item2.description.toLowerCase().includes(value)
    );
    newSearchedValue.length && setsearchData([...newSearchedValue]);
    // !newSearchedValue.length && setsearchData([...data])
  };

  const setMssgRead = (value) => {
    if (!value.read) {
      const newReadData = data.map((item) => {
        if (item.mail == value.mail && !item.read) {
          item.read = true;
          setInboxCount(inboxCount - 1);
        }
        return item;
      });
      newReadData && setdata([...newReadData]);
    }
  };

  return (
    <div className="row" style={{ backgroundColor: "lightgray" }}>
      <div
        className="col-2"
        style={{
          borderRight: "1px solid black",
          height: "100vh",
          padding: "30px",
          paddingTop: "90px",
          backgroundColor: "grey",
        }}
      >
        <div className="sideBar">
          <div>Inbox</div>
          <div>{inboxCount}</div>
        </div>
        <div className="sideBar">
          <div>Flagged</div>
          <div>{flag.length > 0 && `${flag.length}`}</div>
        </div>
        <div className="sideBar">
          <div>Deleted</div>
          <div>{deleted && `${deleted}`}</div>
        </div>
      </div>
      <div className="col-10" style={{ padding: "0px" }}>
        <div style={{ padding: "15px", backgroundColor: "grey" }}>
          <input
          ref={refValue1}
          style={{borderRadius:"5px"}}
            onChange={(e) => searchInbox(e.target.value)}
            placeholder="Search Here"/>
        </div>

        <div>
          <ul style={{ listStyle: "none", margin: "0px", padding: "0px" }}>
            {!checkBoolean
              ? data?.map((item) => {
                  return (
                    <div
                      className="row"
                      style={{
                        margin:"0px",
                        // width:"1085px",
                        padding: "10px",
                        border: "1px solid black",
                        borderRadius: "5px",
                        backgroundColor: "lightskyblue",
                      }}
                    >
                      <div className="col-10">
                        <li onClick={() => setMssgRead(item)}>
                          <h4>{item.mailSubject}</h4>
                        </li>
                        <p>{item.description}</p>
                      </div>
                      <div className="col-2">
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          <div style={{ padding: "10px" }}>
                            {!item.flagged ? (
                              //<button onClick={() => flagMail(item)}>
                            <FlagOutlined onClick={() => flagMail(item)} />

                              //</button>
                            ) : (
                              //<button onClick={() => unFlag(item)}>
                                <FlagFilled onClick={() => unFlag(item)}/>
                             // </button>
                            )}
                          </div>
                          <div
                            style={{
                              padding: "10px",
                            }}
                          >
                            {/* <button onClick={() => deleteEmail(item.mail)}>
                              Delete
                            </button> */}
                            <DeleteOutlined onClick={() => deleteEmail(item.mail)}/>
                          </div>
                        </div>
                        {/* {!item.read ? <div>1</div> : ""} */}
                      </div>
                    </div>
                  );
                })
              : searchData?.map((item) => {
                  return (
                    <div
                    className ="row"
                      style={{
                        margin:"0px",
                        padding: "10px",
                        border: "1px solid black",
                        backgroundColor: "lightskyblue",
                      }}
                    >
                      <div className="col-10">
                      <li onClick={() => setMssgRead(item)}>
                        <h4>{item.mailSubject}</h4>
                      </li>
                      <p>{item.description}</p>
                      </div>
                      <div className="col-2"> 
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        <div style={{ padding: "10px" }}>
                          {!item.flagged ? (
                            // <button onClick={() => flagMail(item)}>Flag</button>
                            <FlagOutlined onClick={() => flagMail(item)} />
                          ) : (
                            <FlagFilled onClick={() => unFlag(item)}/>
                            // <button onClick={() => unFlag(item)}>unFlag</button>
                          )}
                        </div>
                        <div
                          style={{
                            padding: "10px",
                          }}
                        >
                          {/* <button onClick={() => deleteEmail(item.mail)}>
                            Delete
                          </button> */}
                          <DeleteOutlined onClick={() => deleteEmail(item.mail)}/>
                        </div>
                        </div>
                        {/* {!item.read && <div>1</div>} */}
                      </div>
                    </div>
                  );
                })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
