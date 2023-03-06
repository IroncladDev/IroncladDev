import Head from "next/head";
import { useState, useEffect, useRef } from 'react';
import styles from "@/styles/Dashboard.module.css";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Options from "@/components/Options";
import config from "@/utils/server.config";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const USERS_PER_PAGE = 10;

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [type, setType] = useState(0);
  const restart = useRef(true);
  const end = useRef(false);

  useEffect(() => {
    fetch(`/api/search?page=${page}&type=${type}&query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(error);
        } else {
          end.current = data.users.length < USERS_PER_PAGE;
          if (restart.current) {
            setUsers(data.users);
            restart.current = false;
          } else {
            setUsers((u) => [...u, ...data.users]);
          }
        }
      });
  }, [page, query, type]);  

  function search(txt) {
    restart.current = true;
    setPage(0);
    setQuery(txt);
  }

  function change(val) {
    restart.current = true;
    setPage(0);
    setType(val);
  }

  function fetchMore () {
    setPage((p) => p + 1);
  }

  function addVerifiedRole(user) {
    fetch('/api/role/' + user);
  }

  return (
    <>
      <Head>
        <title>{config.appTitle} | Dashboard</title>
      </Head>
      <div className={styles.dashboard}>
        <div className={styles.app}>
          <h1>DASHBOARD</h1>
          <div className={styles.menu}>
            <Input placeholder="Search a username" onEnter={search} />
            <Options onChange={change} options={["All", "Verified", "Not verified"]} />
          </div>
          {users.map((i, j) => (
            <div key={j} className={styles.row} tabIndex={-1}>
              <img src={i.avatar} />
              <div className={styles.infos}>
                <div className={styles.user}>
                  <label>{i.discriminator}</label>
                  {!i.verified && <span>NOT VERIFIED</span>}
                </div>
                <div className={styles.actions}>
                  <label data-label="Email: ">{ i.email }</label>
                  <label
                    style={{ cursor: 'pointer' }}
                    onClick={() => window.open(`https://discord.com/users/${i.discordId}`)}
                    data-label="Discord ID: ">{ i.discordId }</label>
                  <Button
                    style={{ width: 'max-content', margin: '8px 0' }}
                    type="SUCCESS"
                    onClick={() => addVerifiedRole(i.discordId)}>Add verified role</Button>
                </div>
              </div>
            </div>
          ))}
          {
            !end.current &&
              <Button style={{ margin: '16px auto' }} onClick={fetchMore}>More</Button>
          }
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !config.admins.includes(session.user.email)) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  
  return {
    props: {},
  };
}
