import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "@/helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({
      message: "connecting to the database failed",
    });
    return;
  }
  if (req.method === "POST") {
    // Add server side validation
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    let result;

    try {
      result = await insertDocument(
        client,
        "comments",
        newComment
      );
      newComment._id = result.insertedId;
      res.status(201).json({
        message: "Added comment.",
        comment: newComment,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Inserting comment failed" });
    }
  }

  if (req.method === "GET") {
    // const dummyList = [
    //   { id: "c1", name: "matt", text: "A first comment" },
    //   { id: "c2", name: "Bob", text: "A second comment" },
    //   { id: "c3", name: "Steve", text: "A third comment" },
    // ];
    let documents;
    try {
      documents = await getAllDocuments(
        client,
        "comments",
        { _id: -1 }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Getting comments failed" });
    }
  }
  client.close();
}

export default handler;
