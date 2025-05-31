import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  IconButton,
  Avatar,
  Divider,
  Tooltip,
} from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ReplyIcon from "@mui/icons-material/Reply";
import {
  useGetPostsQuery,
  useCreatePostMutation,
  useVotePostMutation,
  useCommentPostMutation,
  useCommentChildPostMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../post/PostAPI";
import type { CommentType, PostType } from "../../app/models/content";
import UnAuthorized from "../../app/layout/UnAuthorized";
import { formatDistanceToNow } from 'date-fns';
export const Post: React.FC = () => {
  const { data: posts, refetch } = useGetPostsQuery();
  const [createPost] = useCreatePostMutation();
  const [votePost] = useVotePostMutation();
  const [commentPost] = useCommentPostMutation();
  const [commentChildPost] = useCommentChildPostMutation();
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const [newPost, setNewPost] = useState("");
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [visibleComments, setVisibleComments] = useState<{ [key: number]: boolean }>({});
  const [following, setFollowing] = useState<string[]>([]);

  const userEmail = localStorage.getItem("user") ?? "anonymous";

  const handleCreate = async () => {
    if (!newPost.trim()) return;
    try {
      await createPost({ content: newPost, authorEmail: userEmail }).unwrap();
      setNewPost("");
      refetch();
    } catch (err) {
      console.error("Failed to create post", err);
    }
  };

  const handleCommentChange = (key: string, value: string) => {
    setCommentInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddComment = async (postId: number, parentId: number | null = null) => {
    const key = `${postId}-${parentId ?? "root"}`;
    const text = commentInputs[key]?.trim();
    if (!text) return;

    try {
      setCommentInputs((prev) => ({ ...prev, [key]: "" }));
      if (parentId === null) {
        await commentPost({ id: postId, text: text, authorEmail: userEmail }).unwrap();
      } else {
        await commentChildPost({
          ParentCommentId: parentId,
          Text: text,
          AuthorEmail: userEmail,
        }).unwrap();
      }
      refetch();
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  const toggleCommentsVisibility = (postId: number) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const countComments = (comments: CommentType[]): number => {
    return comments.reduce((acc, comment) => {
      const childCount = comment.comments ? countComments(comment.comments) : 0;
      return acc + 1 + childCount;
    }, 0);
  };

  const renderComments = (comments: CommentType[], postId: number, level = 0): React.ReactNode => {
    return comments.map((comment) => {
      const key = `${postId}-${comment.id}`;
      return (
        <Box key={comment.id} ml={level * 4} mt={2}>
          <Box display="flex" alignItems="center" gap={1}>
          <Avatar sx={{ width: 24, height: 24 }}>
            {comment.authorEmail[0].toUpperCase().split("@")[0]}
          </Avatar>
          <Box>
            <Typography variant="body2">
              <strong>{comment.authorEmail.split("@")[0]}:</strong> {comment.text}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </Typography>
          </Box>
        </Box>


          <Box display="flex" alignItems="center" mt={1} gap={1}>
            <TextField
              size="small"
              placeholder="Reply..."
              value={commentInputs[key] || ""}
              onChange={(e) => handleCommentChange(key, e.target.value)}
              sx={{ flex: 1 }}
            />
            <IconButton onClick={() => handleAddComment(postId, comment.id)}>
              <ReplyIcon fontSize="small" />
            </IconButton>
          </Box>

          {comment.comments?.length > 0 &&
            renderComments(comment.comments, postId, level + 1)}
        </Box>
      );
    });
  };

  return (
    <Box p={3} minHeight="100vh">
      <UnAuthorized/>
      <Card sx={{ mb: 3, p: 2, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h6" mb={2}>Create a Post</Typography>
        <Box display="flex" gap={2}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <Button onClick={handleCreate} variant="contained" color="primary">
            Post
          </Button>
        </Box>
      </Card>

      {posts?.map((post: PostType) => {
        const rootKey = `${post.id}-root`;
        const commentCount = countComments(post.comments);
        return (
          <Card key={post.id} sx={{ mb: 3, borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
               <Box>
                <Typography variant="body1">
                  <strong>{post.authorEmail.split("@")[0]}:</strong> {post.content}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </Typography>
              </Box>

                

                {post.authorEmail !== userEmail && (
                  <Tooltip title={post.isFollowedUser ? "Unfollow" : "Follow"}>
                    <IconButton
                      aria-label="Follow user"
                      color="primary"
                      onClick={async () => {
                        try {
                          if (following.includes(post.authorEmail)) {
                            await unfollowUser({
                              followerEmail: userEmail,
                              followeeEmail: post.authorEmail,
                            }).unwrap();
                            setFollowing((prev) =>
                              prev.filter((email) => email !== post.authorEmail)
                            );
                          } else {
                            await followUser({
                              followerEmail: userEmail,
                              followingEmail: post.authorEmail,
                            }).unwrap();
                            setFollowing((prev) => [...prev, post.authorEmail]);
                          }
                          refetch();
                        } catch (err) {
                          console.error("Follow/unfollow failed", err);
                        }
                      }}
                    >
                      <PersonAddAltIcon
                        color={post.isFollowedUser ? "disabled" : "inherit"}
                      />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <IconButton onClick={() => votePost({ id: post.id, up: true })}>
                  <ThumbUpIcon />
                </IconButton>
                <Typography>{post.upvotes}</Typography>
                <IconButton onClick={() => votePost({ id: post.id, up: false })}>
                  <ThumbDownIcon />
                </IconButton>
                <Typography>{post.downvotes}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />

              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2">
                  Comments ({commentCount})
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => toggleCommentsVisibility(post.id)}
                >
                  {visibleComments[post.id] ? "Hide" : "Show"}
                </Button>
              </Box>

              {visibleComments[post.id] && renderComments(post.comments, post.id)}

              <Box display="flex" alignItems="center" mt={2} gap={1}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Add a comment..."
                  value={commentInputs[rootKey] || ""}
                  onChange={(e) => handleCommentChange(rootKey, e.target.value)}
                />
                <Button onClick={() => handleAddComment(post.id)} variant="outlined">
                  Comment
                </Button>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};
