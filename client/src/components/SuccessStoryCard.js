
function SuccessStoryCard({ story }) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-bold">{story.studentName}</h3>
      <p className="text-gray-600">{story.storyText}</p>
      <p className="text-gray-800 font-semibold">Course: {story.courseName}</p>
    </div>
  );
}

export default SuccessStoryCard;
