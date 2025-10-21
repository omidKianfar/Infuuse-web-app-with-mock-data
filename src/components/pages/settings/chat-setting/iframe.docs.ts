const iframeDocs = (link: string) => `<div>
      <iframe
        src="${link}"
        title="InFUUSE live chat"
        width="400px"
        height="600px"
        id="infuuse-iframe"
        style="
          border: 1px solid #636e72;
          outline: none;
          position: fixed;
          right: 20px;
          bottom: 80px;
          border-radius: 10px;
          visibility: collapse;
          opacity: 0;
          transition: 0.3s;
        "
      ></iframe>

      <div
        style="
          position: fixed;
          right: 20px;
          bottom: 20px;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background-color: #636e72;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          visibility: collapse;
          opacity: 0;
          transition: 0.3s;
        "
        id="infuuse-chat-box"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27.105"
          height="27.105"
          viewBox="0 0 27.105 27.105"
        >
          <g
            id="vuesax_bold_messages-2"
            data-name="vuesax/bold/messages-2"
            transform="translate(-428)"
          >
            <g id="messages-2" transform="translate(428)">
              <path
                id="Vector"
                d="M0,0H27.105V27.105H0Z"
                fill="none"
                opacity="0"
              />
              <path
                id="Vector-2"
                data-name="Vector"
                d="M15.7,16.749l.44,3.569a1.124,1.124,0,0,1-1.694,1.107L10.542,19.1a.564.564,0,0,1-.192-.768,7.133,7.133,0,0,0,.87-3.388,7.72,7.72,0,0,0-7.906-7.5,8.14,8.14,0,0,0-2.575.407.57.57,0,0,1-.723-.678A9.843,9.843,0,0,1,9.717,0c5.511,0,9.973,4.167,9.973,9.306A9.1,9.1,0,0,1,15.7,16.749Z"
                transform="translate(5.157 2.259)"
                fill="#63d69e"
              />
              <path
                id="Vector-3"
                data-name="Vector"
                d="M12.423,5.805a5.49,5.49,0,0,1-1.333,3.569A6.307,6.307,0,0,1,6.212,11.6L3.264,13.349A.706.706,0,0,1,2.2,12.661l.282-2.225A5.634,5.634,0,0,1,0,5.805,5.673,5.673,0,0,1,2.688,1.028,6.419,6.419,0,0,1,6.212,0,6.016,6.016,0,0,1,12.423,5.805Z"
                transform="translate(2.259 11.396)"
                fill="#63d69e"
              />
            </g>
          </g>
        </svg>
      </div>
</div>

<script>
      var iframe = document.getElementById("infuuse-iframe");
      var chatBox = document.getElementById("infuuse-chat-box");

      chatBox.onclick = function () {
        iframe.style.visibility = "initial";
        iframe.style.opacity = 1;
      };

      iframe.onload = function () {
        chatBox.style.visibility = "initial";
        chatBox.style.opacity = 1;
      };

      function listener(event) {
        if (!iframe || iframe.contains(event.target)) {
          return;
        }
        if (!chatBox || chatBox.contains(event.target)) {
          return;
        }

        iframe.style.visibility = "collapse";
        iframe.style.opacity = 0;
      }

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
</script>`;

export default iframeDocs;
