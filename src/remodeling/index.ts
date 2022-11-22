//  Models
import Interaction from "../models/Interaction/interaction.model";
import Post from "../models/Post/post.model";
import Comment from "../models/Comment/comment.model";

//  Types
import { InteractionDocument as _InteractionDocument } from "../types/interaction";
import { PostDocument as _PostDocument } from "../types/post";
import { CommentDocument as _CommentDocument } from "../types/comment";

// Enums
import { DOCSTYPES } from "../types/enum";

interface TypesObjectKeys {
  LIKE: number;
  DISLIKE: number;
  SAD: number;
  ANGRY: number;
}

/*
 *
 *    This part should only be executed once.
 *    It should not be executed more than once. At the bellow, the code will return and rest the schemas to what it was
 *
 *
 *    NOTE: The idea for all this is that the performance will make the server very fast and the execution time will be very short
 *
 */

// Remodeling the schemas

(async () => {
  try {
    const interactionsOfPosts = await Interaction.find({ post: { $ne: null } });
    const interactionsOComments = await Interaction.find({
      comment: { $ne: null },
    });

    interactionsOfPosts.forEach(async (interaction) =>
      createInteractionsKeysForDocs(interaction, DOCSTYPES.POST)
    );
    interactionsOComments.forEach(async (interaction) => {
      createInteractionsKeysForDocs(interaction, DOCSTYPES.COMMENT);
    });
  } catch (error) {
    console.log(error);
  }
})();

const createInteractionsKeysForDocs = async (
  interaction: _InteractionDocument,
  docType: DOCSTYPES
) => {
  const type = interaction.type;
  const _id =
    docType === DOCSTYPES.POST ? interaction.post : interaction.comment;
  const doc =
    docType === DOCSTYPES.POST
      ? await Post.findOne({ _id: _id })
      : await Comment.findOne({ _id: _id });

  // Check if Document Not Found
  if (!doc) return console.log("Not Found");
  doc.interactions = {
    ...doc.interactions,
    [type]: doc.interactions[type as keyof TypesObjectKeys] + 1,
  };
  await doc.save();
};

// Rest the schema

// (async () => {
//   try {
//     const posts = await Post.find();
//     const comments = await Comment.find();
//     posts.forEach((post) => restInteractionsKeysForDocs(post));
//     comments.forEach((comment) => restInteractionsKeysForDocs(comment));
//   } catch (error) {
//     console.log(error);
//   }
// })();

// const restInteractionsKeysForDocs = async (
//   doc: _CommentDocument | _PostDocument
// ) => {
//   doc.interactions = {
//     LIKE: 0,
//     DISLIKE: 0,
//     SAD: 0,
//     ANGRY: 0,
//   };
//   await comment.save();
// };
