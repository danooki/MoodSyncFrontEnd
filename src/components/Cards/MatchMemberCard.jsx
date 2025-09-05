import {
  getTraitColor,
  getTraitName,
  getTraitDescription,
} from "../../utils/discUtils";
import Avatar from "../UI/Avatar";

const MatchMemberCard = ({ member, isSinglePersonCircle }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Member Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Avatar
          src={member.avatar}
          alt={member.displayName}
          displayName={member.displayName}
          size="lg"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {member.displayName}
          </h2>
          <p className="text-gray-600">
            {isSinglePersonCircle ? "Your daily mood" : "Circle member"}
          </p>
        </div>
      </div>

      {/* DISC Traits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Primary Trait */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Primary Trait
          </h3>
          {member.dailyDominantTrait ? (
            <div className="space-y-3">
              <div
                className={`inline-flex items-center px-3 py-2 rounded-lg border-2 font-bold text-lg ${getTraitColor(
                  member.dailyDominantTrait
                )}`}
              >
                {member.dailyDominantTrait}
              </div>
              <h4 className="font-medium text-gray-900">
                {getTraitName(member.dailyDominantTrait)}
              </h4>
              <p className="text-gray-600 text-sm">
                {getTraitDescription(member.dailyDominantTrait)}
              </p>
              {member.attributes && member.attributes.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Key Attributes:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.attributes.map((attr, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white rounded-md text-xs font-medium text-gray-700 border border-gray-200"
                      >
                        {attr}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 italic">No primary trait available</p>
          )}
        </div>

        {/* Secondary Trait */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Secondary Trait
          </h3>
          {member.dailySecondaryTrait ? (
            <div className="space-y-3">
              <div
                className={`inline-flex items-center px-3 py-2 rounded-lg border-2 font-bold text-lg ${getTraitColor(
                  member.dailySecondaryTrait
                )}`}
              >
                {member.dailySecondaryTrait}
              </div>
              <h4 className="font-medium text-gray-900">
                {getTraitName(member.dailySecondaryTrait)}
              </h4>
              <p className="text-gray-600 text-sm">
                {getTraitDescription(member.dailySecondaryTrait)}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 italic">No secondary trait available</p>
          )}
        </div>
      </div>

      {/* Match Insights */}
      {member.interestText && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3">
            What You're Looking For
          </h3>
          <p className="text-green-700">{member.interestText}</p>
        </div>
      )}

      {member.lookingForText && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            What You're Seeking
          </h3>
          <p className="text-blue-700">{member.lookingForText}</p>
        </div>
      )}
    </div>
  );
};

export default MatchMemberCard;
