"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { getForms, createForm, getResponses, submitResponse } from "@/lib/api";

export default function FormsPage() {
  // Forms State
  const [forms, setForms] = useState([]);

  // Form Builder state
  const [formTitle, setFormTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");

  // Response modal state
  const [responseForm, setResponseForm] = useState(null);
  const [responseCustomer, setResponseCustomer] = useState("");
  const [responseAnswers, setResponseAnswers] = useState([]);

  // Selected form for viewing Responses
  const [selectedForm, setSelectedForm] = useState(null);

  // Fetch forms
  const fetchForms = async () => {
    try {
      const data = await getForms();
      setForms(data);
    } catch (error) {
      toast.error("Failed to load forms ❌");
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  // Add Question
  const addQuestion = () => {
    if (!questionText.trim()) return;

    setQuestions((prev) => [...prev, questionText]);
    setQuestionText("");
  };

  // Create new form
  const handleCreateForm = async () => {
    if (!formTitle || questions.length === 0) {
      toast.error("Form Incomplete ❌", {
        description: "Add title and atleast 1 question",
      });
      return;
    }

    try {
      const newForm = await createForm({
        title: formTitle,
        questions,
      });

      setForms((prev) => [newForm, ...prev]);

      toast.success("From created ✅");

      // Reset Builder
      setFormTitle("");
      setQuestionText("");
      setQuestions([]);
    } catch (error) {
      toast.error("Failed to create Form ❌");
    }
  };

  // view responses
  const handleViewResponses = async (form) => {
    try {
      const freshResponses = await getResponses(form._id);
      setSelectedForm({ ...form, responses: freshResponses });
    } catch (error) {
      toast.error("Could not load responses ❌");
    }
  };

  //   Open response modal
  const openResponseModal = (form) => {
    setResponseForm(form);
    setResponseCustomer("");
    setResponseAnswers(new Array(form.questions.length).fill(""));
  };

  // Submit Response
  const handleSubmitResponse = async () => {
    if (!responseCustomer.trim()) {
      toast.error("Customer name required ❌");
      return;
    }

    try {
      const newResponse = await submitResponse(responseForm._id, {
        customerName: responseCustomer,
        answers: responseAnswers,
      });

      // update ui instantly
      setForms((prev) =>
        prev.map((f) =>
          f._id === responseForm._id
            ? {
                ...f,
                responses: [newResponse, ...(f.responses || [])],
                responseCount: (f.responseCount || 0) + 1,
              }
            : f,
        ),
      );

      toast.success("Response Submitted 📩");

      // close modal
      setResponseForm(null);
    } catch (error) {
      toast.error("Failed to submit response ❌");
    }
  };

  return (
    <div className="space-y-10 px-2 sm:px-6 lg:px-10 py-6">
      {/* Heading */}
      <div>
        <h1 className="text-4xl font-bold">Forms 📝</h1>
        <p className="text-gray-500 mt-2">
          Create intake forms and collect responses.
        </p>
      </div>

      {/* Form Builder */}
      <Card className="shadow-md">
        <CardContent className="space-y-4 p-6">
          <h2 className="text-2xl font-semibold">➕ Create New Form</h2>

          {/* Title Input */}
          <Input
            placeholder="Form Title (e.g. Service Request Form)"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />

          {/* Add Question */}
          <div className="flex gap-2">
            <Input
              placeholder="Add a question..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
            <Button onClick={addQuestion}>Add</Button>
          </div>

          {/* Questions Preview */}
          {questions.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold">Questions :</h3>
              {questions.map((q, index) => (
                <p key={index} className="text-sm">
                  {index + 1}. {q}
                </p>
              ))}
            </div>
          )}
          <Button
            disabled={!formTitle || questions.length === 0}
            className="w-full sm:w-fit"
            onClick={handleCreateForm}
          >
            Create Form
          </Button>
        </CardContent>
      </Card>

      {/* Forms List */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">📌 Available Forms</h2>

          {forms.length === 0 ? (
            <p className="text-gray-500">No form created yet.</p>
          ) : (
            <div className="space-y-4">
              {forms.map((form) => (
                <div
                  key={form._id}
                  className="border rounded-lg p-4  flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{form.title}</h3>
                    <p className="text-sm text-gray-500">
                      Questions : {form.questions.length} | Responses:{" "}
                      {form.responseCount || 0}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => openResponseModal(form)}
                    >
                      Submit Response
                    </Button>

                    <Button onClick={() => handleViewResponses(form)}>
                      View Responses
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Response Modal */}
      {responseForm && (
        <Card className="shadow-md border-2 border-blue-200">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">
              📩 Submit Response : {responseForm.title}
            </h2>

            {/* Customer name */}
            <Input
              placeholder="Customer Name"
              value={responseCustomer}
              onChange={(e) => setResponseCustomer(e.target.value)}
            />

            {/* Answers Input */}
            <div className="space-y-3">
              {responseForm.questions.map((q, index) => (
                <Input
                  key={index}
                  placeholder={q}
                  value={responseAnswers[index]}
                  onChange={(e) => {
                    const updated = [...responseAnswers];
                    updated[index] = e.target.value;
                    setResponseAnswers(updated);
                  }}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-2 flex-wrap">
              <Button onClick={handleSubmitResponse}>Submit Response</Button>
              <Button variant="outline" onClick={() => setResponseForm(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Response Viewer */}
      {selectedForm && (
        <Card className="shadow-md">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">
              📊 Responses : {selectedForm.title}
            </h2>

            {selectedForm.responses.length === 0 ? (
              <p className="text-gray-500">No Responses yet.</p>
            ) : (
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Answers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedForm.responses.map((r) => (
                      <tr key={r._id} className="border-t hover:bg-gray-50">
                        <td className="p-4 font-medium">{r.customerName}</td>
                        <td className="p-4">{r.answers.join(" | ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <Button variant="outline" onClick={(e) => setSelectedForm(null)}>
              Close Responses
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
