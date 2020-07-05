import React, { useState, useEffect } from 'react'
import { DevApi } from '../../api';

/**
 * Used for testing only
 */
export function Experimental() {
  const [text, setText] = useState("...");
  useEffect(() => {
    const api = new DevApi();
    //@ts-ignore
    api.devControllerMarcoPersonal().then(res => res.json()).then(res => setText(JSON.stringify(res)));
  }, [])

  return <h1 style={{height: "500px", marginTop: "200px", "zIndex": 500 }}>{text}</h1>
}