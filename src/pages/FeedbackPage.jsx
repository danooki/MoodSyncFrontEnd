import { useState } from "react";
import { BASE_URL } from "../config/api.js";
import { useAuth } from "../hooks/useAuth.jsx";
import {
  Button,
  Card,
  ErrorMessage,
  SuccessMessage,
  Textarea,
} from "../components/UI";

const FeedbackPage = () => {
  const { getToken } = useAuth();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setSubmitStatus({ type: "error", message: "Please enter your feedback" });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const token = getToken();
      const response = await fetch(`${BASE_URL}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ message: message.trim() }),
      });

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you for your feedback!",
        });
        setMessage("");
      } else {
        setSubmitStatus({
          type: "error",
          message: "Failed to submit feedback. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to submit feedback. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Share Your Feedback
          </h1>

          <p className="text-gray-600 mb-6">
            We'd love to hear from you! Share your thoughts, suggestions, or
            report any issues.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Textarea
                label="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                maxLength={500}
                placeholder="Tell us what's on your mind..."
                disabled={isSubmitting}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {message.length}/500 characters
              </div>
            </div>

            {submitStatus && (
              <>
                {submitStatus.type === "success" ? (
                  <SuccessMessage message={submitStatus.message} />
                ) : (
                  <ErrorMessage message={submitStatus.message} />
                )}
              </>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isSubmitting}
              disabled={!message.trim()}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackPage;
