const PORT = process.env.PORT || 3003;
const app = require("./app");


const init = async () => {
  try {
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

init();