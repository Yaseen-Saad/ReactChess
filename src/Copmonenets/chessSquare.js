import React from "react";

function Square(param) {
  let css = {
      backgroundColor: param.color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "solid 1px black",
    },
    image,
    board = document.querySelector("#root > div"),
    [boardState, setBoard] = React.useState(
      document.querySelector("#root > div")
    ),
    x = param.poss[0],
    y = param.poss[1];

  React.useEffect(() => {
    setBoard(Array(...document.querySelector("#root > div").children));
  }, []);

  if (y === 7) {
    image = "./images/pawn_b.png";
  }
  if (y === 2) {
    image = "./images/pawn_w.png";
  }
  if (x === "A" || x === "H") {
    if (y === 8) {
      image = "./images/rook_b.png";
    }
    if (y === 1) {
      image = "./images/rook_w.png";
    }
  }
  if (x === "B" || x === "G") {
    if (y === 8) {
      image = "./images/knight_b.png";
    }
    if (y === 1) {
      image = "./images/knight_w.png";
    }
  }
  if (x === "C" || x === "F") {
    if (y === 8) {
      image = "./images/bishop_b.png";
    }
    if (y === 1) {
      image = "./images/bishop_w.png";
    }
  }
  if (x === "E") {
    if (y === 8) {
      image = "./images/king_b.png";
    }
    if (y === 1) {
      image = "./images/king_w.png";
    }
  }
  if (x === "D") {
    if (y === 8) {
      image = "./images/queen_b.png";
    }
    if (y === 1) {
      image = "./images/queen_w.png";
    }
  }
  let mouseDown = false;

  function moving(e) {
    if (
      mouseDown &&
      e.clientX - board.offsetLeft > 40 &&
      e.clientX - board.offsetLeft < board.offsetWidth - 40 &&
      e.clientY - board.offsetTop - 50 > 0 &&
      e.clientY - board.offsetTop - 50 < board.offsetHeight - 100
    ) {
      e.target.style.position = "absolute";
      e.target.style.left = `${e.clientX - board.offsetLeft - 50}px`;
      e.target.style.top = `${e.clientY - board.offsetTop - 50}px`;
    }
  }
  function mouseUp(e) {
    mouseDown = false;
    let cell = [
        parseInt(parseInt((e.clientX - board.offsetLeft) / 100)),
        parseInt(parseInt((e.clientY - board.offsetTop) / 100)),
      ],
      first = true;
    setBoard(Array(...document.querySelector("#root > div").children));
    // initial Board State

    setBoard((val) => {
      let Bgimage;
      return val.map((p, i) => {
        if (i === cell[0] + cell[1] * 8 && first) {
          let x = e.target.parentNode.cloneNode(1);
          Bgimage = e.target.getAttribute('backgroundimage')
          e.target.parentNode.innerHTML = "";
          p.innerHTML = x.innerHTML;
          p.children[0].style.top = `${cell[1] * 100}px`;
          p.children[0].style.left = `${cell[0] * 100}px`;
          first = false;
          return (
            <div style={css} cell-id={param.cellId}>
              <span
                onMouseDown={function (e) {
                  mouseDown = 1;
                }}
                onMouseMove={(e) => moving(e)}
                onMouseUp={mouseUp}
                style={{
                  backgroundImage: `url(${Bgimage})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              ></span>
            </div>
          );
        } else {
          return (
            <div style={css} cell-id={param.cellId}>
              {image ? (
                <span
                  onMouseDown={function (e) {
                    mouseDown = 1;
                    console.log(e);
                  }}
                  onMouseMove={(e) => moving(e)}
                  onMouseUp={mouseUp}
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                ></span>
              ) : (
                ""
              )}
            </div>
          );
        }
      });
    });
  }
  return (
    <div style={css} cell-id={param.cellId}>
      {image ? (
        <span
          onMouseDown={function (e) {
            mouseDown = 1;
            console.log(e);
          }}
          onMouseMove={(e) => moving(e)}
          onMouseUp={mouseUp}
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
            backgroundimage={image}
        ></span>
      ) : (
        ""
      )}
    </div>
  );
}

export { Square };
