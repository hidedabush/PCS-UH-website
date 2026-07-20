"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import Heading from "@/components/Heading";
import Card from "@/components/Card";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

const INTERESTS = [
  "CUDA",
  "GPU Architecture",
  "AI Infrastructure",
  "Distributed Systems",
  "Computer Architecture",
  "Research",
  "Projects",
  "Sponsorship",
] as const;

const BENEFITS = [
  "CUDA and C++ workshops",
  "GitHub organization access",
  "Project teams",
  "Resume pool access",
  "Sponsor events",
  "Computing facility tours",
  "Technical mentorship",
  "Community Discord",
];

export const joinSchema = z.object({
  fullName: z.string().min(2, "Enter your full name."),
  email: z
    .string()
    .email("Enter a valid email.")
    .refine((v) => v.toLowerCase().endsWith("uh.edu"), {
      message: "Use your UH email (ends in uh.edu).",
    }),
  major: z.string().min(2, "Enter your major."),
  gradYear: z
    .string()
    .regex(/^20\d{2}$/, "Enter a 4-digit graduation year (e.g. 2027)."),
  experience: z.enum(["Beginner", "Intermediate", "Advanced"], {
    errorMap: () => ({ message: "Select your experience level." }),
  }),
  interests: z.array(z.string()).min(1, "Pick at least one interest."),
});

type JoinForm = z.infer<typeof joinSchema>;

const inputClasses =
  "w-full border border-line bg-black px-3.5 py-2.5 text-sm text-white placeholder:text-textFaint transition-colors focus:border-accent focus:outline-none";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs text-uhred">
      {message}
    </p>
  );
}

export default function Join() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JoinForm>({
    resolver: zodResolver(joinSchema),
    defaultValues: { interests: [] },
  });

  const onSubmit = async (data: JoinForm) => {
    // POSTs to the placeholder API route — swap in Resend/EmailJS there.
    await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => null);
    setSubmitted(true);
  };

  return (
    <section
      id="join"
      className="relative border-t border-line py-24 md:py-32"
      aria-label="Join UH PCS"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <Heading
            eyebrow="Membership"
            title="Request access"
            subtitle="Join UH PCS to access workshops, project teams, GitHub repositories, sponsor events, and a community of students learning the future of computing."
          />
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-[1fr,1.4fr]">
          <Reveal>
            <Card className="h-full p-6 sm:p-8">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.1em] text-textFaint">
                Member benefits
              </p>
              <ul className="space-y-3.5">
                {BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-sm text-textMuted">
                    <span className="h-1 w-1 shrink-0 bg-accent" aria-hidden />
                    {benefit}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="relative overflow-hidden p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                    role="status"
                  >
                    <span className="grid h-14 w-14 place-items-center border border-accent/40 bg-accent/10">
                      <CheckCircle2 className="h-7 w-7 text-accent" aria-hidden />
                    </span>
                    <p className="mt-6 text-base font-semibold text-white">
                      Request received
                    </p>
                    <p className="mt-5 max-w-sm text-sm leading-relaxed text-textMuted">
                      An officer will review your request and reach out with
                      Discord and GitHub access. Watch your UH inbox.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="fullName" className="mb-1.5 block text-xs font-medium text-textMuted">
                          Full name
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          placeholder="Ada Lovelace"
                          autoComplete="name"
                          className={inputClasses}
                          {...register("fullName")}
                        />
                        <FieldError message={errors.fullName?.message} />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-textMuted">
                          UH email
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="you@uh.edu"
                          autoComplete="email"
                          className={inputClasses}
                          {...register("email")}
                        />
                        <FieldError message={errors.email?.message} />
                      </div>
                      <div>
                        <label htmlFor="major" className="mb-1.5 block text-xs font-medium text-textMuted">
                          Major
                        </label>
                        <input
                          id="major"
                          type="text"
                          placeholder="Computer Science"
                          className={inputClasses}
                          {...register("major")}
                        />
                        <FieldError message={errors.major?.message} />
                      </div>
                      <div>
                        <label htmlFor="gradYear" className="mb-1.5 block text-xs font-medium text-textMuted">
                          Graduation year
                        </label>
                        <input
                          id="gradYear"
                          type="text"
                          inputMode="numeric"
                          placeholder="2027"
                          className={inputClasses}
                          {...register("gradYear")}
                        />
                        <FieldError message={errors.gradYear?.message} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="experience" className="mb-1.5 block text-xs font-medium text-textMuted">
                        Experience level
                      </label>
                      <select
                        id="experience"
                        className={cn(inputClasses, "appearance-none")}
                        defaultValue=""
                        {...register("experience")}
                      >
                        <option value="" disabled>
                          Select level…
                        </option>
                        <option value="Beginner">Beginner — new to parallel computing</option>
                        <option value="Intermediate">Intermediate — some C++/CUDA exposure</option>
                        <option value="Advanced">Advanced — shipped GPU code</option>
                      </select>
                      <FieldError message={errors.experience?.message} />
                    </div>

                    <fieldset>
                      <legend className="mb-2 text-xs font-medium text-textMuted">
                        Interests — select all that apply
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {INTERESTS.map((interest) => (
                          <label key={interest} className="relative cursor-pointer">
                            <input
                              type="checkbox"
                              value={interest}
                              className="peer sr-only"
                              {...register("interests")}
                            />
                            <span className="inline-block border border-line px-3 py-1.5 text-sm text-textMuted transition-colors peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-accent">
                              {interest}
                            </span>
                          </label>
                        ))}
                      </div>
                      <FieldError message={errors.interests?.message} />
                    </fieldset>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center gap-2 bg-accent px-5 py-3.5 text-sm font-medium text-black transition-colors hover:bg-accentHover disabled:cursor-wait disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                          Submitting…
                        </>
                      ) : (
                        "Request Access"
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
