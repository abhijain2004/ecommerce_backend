const model = require("./../Model/feedback");
const Feedback = model.Feedback;

exports.form = async (req, res) => {
  try {
    const data = req.body;
    const newFeedback = new Feedback(data);
    const response = await newFeedback.save();
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}