"use client";
import { useState } from "react";
import { RiFileTextLine, RiUploadLine, RiVideoLine, RiPlayLine, RiCheckLine, RiEditLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function TrainingAssessmentsTab({ driverId }) {
  const [trainingModules, setTrainingModules] = useState({
    safetyProtocols: { watched: true, quizQuestions: 2 },
    emergencyProcedures: { watched: false, quizQuestions: 1 },
    studentManagement: { watched: false, quizQuestions: 0 },
    specialNeedsTransportation: { watched: false, quizQuestions: 0 }
  });

  const [notes, setNotes] = useState("");

  const handleMarkAsWatched = (moduleName) => {
    setTrainingModules(prev => ({
      ...prev,
      [moduleName]: { ...prev[moduleName], watched: true }
    }));
  };

  const handleSaveNotes = () => {
    console.log("Notes saved:", notes);
  };

  const handleSendReminder = (reminderData) => {
    console.log("Reminder sent:", reminderData);
  };

  const completedVideos = Object.values(trainingModules).filter(module => module.watched).length;
  const totalVideos = Object.keys(trainingModules).length;
  const progressPercentage = (completedVideos / totalVideos) * 100;

  return (
    <div className="space-y-6">
      {/* Training Videos & Assessments Section */}
      <div className="bg-white rounded-lg p-6 border border-[var(--gray-200)] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <RiVideoLine className="w-5 h-5 text-[var(--blue-600)]" />
          <h3 className="text-lg font-semibold text-[var(--heading)]">Training Videos & Assessments</h3>
        </div>

        <p className="text-sm text-[var(--gray-600)] mb-6">
          Complete all required training videos and assessments as part of the onboarding process.
        </p>

        <div className="space-y-4">
          {/* Safety Protocols */}
          <div className="border border-[var(--gray-200)] rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-[var(--gray-700)]">Safety Protocols</h4>
              {trainingModules.safetyProtocols.watched && (
                <span className="px-2 py-1 text-xs bg-[var(--green-100)] text-[var(--green-600)] rounded-full">
                  Watched
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--gray-600)] mb-2">
              Essential safety protocols for student transportation.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--gray-500)]">15:20</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={trainingModules.safetyProtocols.watched}
                  className="flex items-center gap-2"
                >
                  <RiPlayLine className="w-4 h-4" />
                  Watch Video
                </Button>
                {!trainingModules.safetyProtocols.watched && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleMarkAsWatched('safetyProtocols')}
                    className="flex items-center gap-2"
                  >
                    <RiCheckLine className="w-4 h-4" />
                    Mark as Watched
                  </Button>
                )}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-[var(--gray-100)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RiFileTextLine className="w-4 h-4 text-[var(--gray-500)]" />
                  <span className="text-sm text-[var(--gray-600)]">
                    Assessment Quiz: {trainingModules.safetyProtocols.quizQuestions} questions
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" className="flex items-center gap-2">
                    <RiEditLine className="w-4 h-4" />
                    Edit Quiz
                  </Button>
                  <Button variant="primary" size="sm" className="flex items-center gap-2">
                    Take Quiz
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Procedures */}
          <div className="border border-[var(--gray-200)] rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-[var(--gray-700)]">Emergency Procedures</h4>
              {trainingModules.emergencyProcedures.watched && (
                <span className="px-2 py-1 text-xs bg-[var(--green-100)] text-[var(--green-600)] rounded-full">
                  Watched
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--gray-600)] mb-2">
              How to handle emergencies during transportation.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--gray-500)]">12:45</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={trainingModules.emergencyProcedures.watched}
                  className="flex items-center gap-2"
                >
                  <RiPlayLine className="w-4 h-4" />
                  Watch Video
                </Button>
                {!trainingModules.emergencyProcedures.watched && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleMarkAsWatched('emergencyProcedures')}
                    className="flex items-center gap-2"
                  >
                    <RiCheckLine className="w-4 h-4" />
                    Mark as Watched
                  </Button>
                )}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-[var(--gray-100)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RiFileTextLine className="w-4 h-4 text-[var(--gray-500)]" />
                  <span className="text-sm text-[var(--gray-600)]">
                    Assessment Quiz: {trainingModules.emergencyProcedures.quizQuestions} questions
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" className="flex items-center gap-2">
                    <RiEditLine className="w-4 h-4" />
                    Edit Quiz
                  </Button>
                  <Button variant="primary" size="sm" className="flex items-center gap-2">
                    Take Quiz
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Student Management */}
          <div className="border border-[var(--gray-200)] rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-[var(--gray-700)]">Student Management</h4>
              {trainingModules.studentManagement.watched && (
                <span className="px-2 py-1 text-xs bg-[var(--green-100)] text-[var(--green-600)] rounded-full">
                  Watched
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--gray-600)] mb-2">
              Best practices for managing students during rides.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--gray-500)]">09:30</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={trainingModules.studentManagement.watched}
                  className="flex items-center gap-2"
                >
                  <RiPlayLine className="w-4 h-4" />
                  Watch Video
                </Button>
                {!trainingModules.studentManagement.watched && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleMarkAsWatched('studentManagement')}
                    className="flex items-center gap-2"
                  >
                    <RiCheckLine className="w-4 h-4" />
                    Mark as Watched
                  </Button>
                )}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-[var(--gray-100)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RiFileTextLine className="w-4 h-4 text-[var(--gray-500)]" />
                  <span className="text-sm text-[var(--gray-600)]">
                    Assessment Quiz: {trainingModules.studentManagement.quizQuestions} questions
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" className="flex items-center gap-2">
                    <RiEditLine className="w-4 h-4" />
                    Edit Quiz
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Special Needs Transportation */}
          <div className="border border-[var(--gray-200)] rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-[var(--gray-700)]">Special Needs Transportation</h4>
              {trainingModules.specialNeedsTransportation.watched && (
                <span className="px-2 py-1 text-xs bg-[var(--green-100)] text-[var(--green-600)] rounded-full">
                  Watched
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--gray-600)] mb-2">
              Guidelines for transporting students with special needs.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--gray-500)]">18:15</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={trainingModules.specialNeedsTransportation.watched}
                  className="flex items-center gap-2"
                >
                  <RiPlayLine className="w-4 h-4" />
                  Watch Video
                </Button>
                {!trainingModules.specialNeedsTransportation.watched && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleMarkAsWatched('specialNeedsTransportation')}
                    className="flex items-center gap-2"
                  >
                    <RiCheckLine className="w-4 h-4" />
                    Mark as Watched
                  </Button>
                )}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-[var(--gray-100)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RiFileTextLine className="w-4 h-4 text-[var(--gray-500)]" />
                  <span className="text-sm text-[var(--gray-600)]">
                    Assessment Quiz: {trainingModules.specialNeedsTransportation.quizQuestions} questions
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" className="flex items-center gap-2">
                    <RiEditLine className="w-4 h-4" />
                    Edit Quiz
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Training Progress */}
        <div className="mt-6 pt-6 border-t border-[var(--gray-200)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--gray-700)]">Training Progress</span>
            <span className="text-sm text-[var(--gray-600)]">{completedVideos} of {totalVideos} videos completed</span>
          </div>
          <div className="w-full bg-[var(--gray-200)] rounded-full h-2">
            <div
              className="bg-[var(--blue-600)] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>


    </div>
  );
}
