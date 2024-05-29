function Footer() {
  return (
    <div className="py-11 border-t-4 md:px-7 px-2">
      <div>
        <div className="text-2xl font-semibold">Functions yet to add</div>
        <ol className="list-decimal pl-4 pt-2">
          <li className=" text-lg">Piece promotions</li>
          <li className=" text-lg"> Stock fish be able to take enpassant</li>
          <li className=" text-lg">Eval Bar and other stockfish settings </li>
          <li className=" text-lg">
            improve square color and chess pieces (themes)
          </li>
          <li className=" text-lg">
            Useless Draw rules like 3 fold repetition, insufficient checkmate
            material, 50 move rule
          </li>
          <li className=" text-lg">Chess Notations </li>
        </ol>
      </div>
      <div className=" text-gray-700 text-center font-thin">
        <div className=" text-2xl py-3 ">Copyright © 2024 Bibek Bhusal</div>
        <div className="text-sm pb-5 ">
          Note: This Webpage is deisgned by Bibek Bhusal just for the poupose of
          learning React JS and Tailwind CSS and working with API and
          Complicated logics with Java Script.
          <br />
          Have fun Playing Against Stockfish.
        </div>
        <div className="text-sm py-5">
          Credits to API:
          <a
            href="https://stockfish.online/"
            className=" text-blue-400 hover:text-blue-600 hover:font-semibold transition-all hover:underline"
            target="blank">
            Stockfish
          </a>
          <br />
          Credits to pieces:
          <a
            href="https://github.com/lichess-org/lila"
            className=" text-blue-400 hover:text-blue-600 hover:font-semibold transition-all hover:underline"
            target="blank">
            Lichess github
          </a>
          <br />
        </div>
      </div>
    </div>
  );
}

export default Footer;
