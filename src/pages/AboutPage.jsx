import { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { useLogout } from "../hooks/useLogout.js";
import { Navbar, OffNavBar } from "../components/Navigation/index.js";
import BackgroundWrapper from "../components/UI/BackgroundWrapper.jsx";

// About page with project information and how it works
const AboutPage = () => {
  const { user } = useAuth();
  const { handleLogout } = useLogout();

  return (
    <BackgroundWrapper>
      {/* Navbar for navigation */}
      {user ? <Navbar onLogout={handleLogout} user={user} /> : <OffNavBar />}

      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About MoodSync
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A partner alignment WebApp that helps you and your friends
              identify your mood and plan the perfect evening together using
              DiSC personality assessment.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* What is MoodSync */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                What is MoodSync?
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  MoodSync creates "circles" where friends can join, answer
                  daily questions, and receive personalized activity proposals
                  based on members's mood and personality traits.
                </p>
              </div>
            </div>

            {/* How it Works */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                How it Works
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Create or Join a Circle
                    </h3>
                    <p className="text-gray-600">
                      Start your own circle or accept invitations from friends.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Answer Daily Questions
                    </h3>
                    <p className="text-gray-600">
                      Complete DiSC-based questions to assess your current mood
                      and preferences.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Track Progress
                    </h3>
                    <p className="text-gray-600">
                      Monitor your circle's completion status and see everyone's
                      progress.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Get Proposals
                    </h3>
                    <p className="text-gray-600">
                      Receive personalized activity suggestions based on your
                      group's mood alignment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default AboutPage;
