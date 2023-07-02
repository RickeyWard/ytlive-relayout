import { useEffect, useRef, useState } from "react";


function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [urlBox, setUrlBox] = useState("");
  const [showChat, setShowChat] = useState(true);
  
  const urlParams = new URLSearchParams(window.location.search);
  const vId = urlParams.get('v');

  var [, setState] = useState<any>();
  function reRender() {
    setState({});
  }

  //This just makes the backbutton actually cause a re-render after pushState
  useEffect(()=> {
    const callback = (event: PopStateEvent) => {
      // console.log(`location: ${document.location}, state: ${JSON.stringify(event.state)}`)
      setState({});
    }
    window.addEventListener('popstate', callback);
    () => window.removeEventListener('popstate', callback);
  },[]);

  return (
    <div className="App bg-zinc-900 h-full flex overflow-hidden">
      {vId ? <>
      <div className="w-100 h-100 flex-grow">
        <iframe width="100%" height="100%"
          src={`https://www.youtube.com/embed/${vId}?controls=1&showinfo=0&autoplay=1`}
          title="YouTube video player" frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className={ (showChat ? "w-96" : "w-0") + " flex flex-col overflow-hidden"}>
        <div className="ytlive-controls font-semibold tracking-wide uppercase flex items-center justify-between h-8 px-2 text-sm">
          <button type="button" className="rounded-md px-1" onClick={e=>{e.preventDefault(); setShowChat(false);}}>
            <svg version="1.1" viewBox="0 0 20 20" x="0px" y="0px" aria-hidden="true" focusable="false" fill="currentColor" className="w-6 h-6"><g><path d="M4 16V4H2v12h2zM13 15l-1.5-1.5L14 11H6V9h8l-2.5-2.5L13 5l5 5-5 5z"></path></g></svg>
          </button>
          <a href="/ytlive" className="hover:underline">Diamonddrake.com/ytlive</a>
        </div>
        <iframe className="w-full h-full"
          src={`https://www.youtube.com/live_chat?v=${vId}&embed_domain=${window.location.hostname}`}
          title="chat" frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      { !showChat && <button type="button" className="absolute top-0 right-0 p-1 ytlive-controls__button" onClick={e=>{e.preventDefault(); setShowChat(true);}}>
        <svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" aria-hidden="true" focusable="false" fill="currentColor" className="w-6 h-6"><g><path d="M16 16V4h2v12h-2zM6 9l2.501-2.5-1.5-1.5-5 5 5 5 1.5-1.5-2.5-2.5h8V9H6z"></path></g></svg>
      </button>}
      </> : <div className="justify-self-center self-center mx-auto w-1/3">
        <h1 className="text-gray-200 pb-1 font-bold">Enter URL or video ID for Youtube Live Video</h1>
        <div className="flex">
          <input ref={inputRef} className="flex-grow p-2 text-lg text-gray-200 rounded border outline-none border-gray-600 bg-gray-800 focus:border-gray-200 placeholder:text-gray-600" placeholder="https://www.youtube.com/watch?v=aBcDeFG" value={urlBox} onChange={e=>setUrlBox(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                // this is gross/lazy and I am ashamed, but it's easy and will always work.
                const watchButton = document.getElementById("dd-watch-button");
                watchButton && watchButton.click();
              }
            }
          }
          />
          <button id="dd-watch-button" className="ml-1.5 px-4 font-bold text-gray-200 rounded border outline-none border-gray-600 bg-gray-800 focus:border-gray-200 placeholder:text-gray-600 transition-colors hover:bg-slate-600" onClick={()=>{
            if(urlBox) {
              const regex = /^(?:(?:https:\/\/www\.youtube\.com\/watch\?v=(?<vid>[\w-]+))|(?<vid2>[\w-]+))$/;
              let m;
              if((m = urlBox.match(regex)?.groups) && (m!.vid || m!.vid2)){
                console.log("navigatong to " + m!.vid || m!.vid2)
                urlParams.set('v', m!.vid || m!.vid2);
                history.pushState(null, "", "?"+urlParams.toString());
                reRender();
              } else {
                inputRef.current?.focus();
                inputRef.current?.classList.remove("doShake");
                setTimeout(()=>inputRef.current?.classList.add("doShake"),0)
              }
            } else {
              inputRef.current?.focus();
              inputRef.current?.classList.remove("doShake");
              setTimeout(()=>inputRef.current?.classList.add("doShake"),0)
            }
          }}>Watch</button>
        </div>
        <div className="pt-12">
          <h3 className="text-lg text-gray-400 font-bold">What is this?</h3>
          <p className="pt-2 text-gray-500">
            YouTube's desktop layout is a bit too busy for me. The main thing I like about twitch is that it's just a video and chat and mostly nothing else. Forunately youtube is designed to be embeded in other sites and using the magic of Iframes I can just make some boxes and stick youtube video/livechat into those.
          </p>
          <p className="pt-2 text-gray-500">
            Nothing fancy going on here, I don't collect your information or even know if you're using this, it's completely browser side and I don't care if you use it or not. It's really just for me.
          </p>
          <p className="pt-2 text-gray-500">
            The code open and avaiable, if you have any issues or suggestions feel free to open an "issue" on github.
            <br/>         
            <a className="text-gray-400 hover:underline" href="https://github.com/RickeyWard/ytlive-relayout" target="_blank">https://github.com/RickeyWard/ytlive-relayout</a>
          </p>
        </div>
      </div>}
    </div>
  )
}

export default App
