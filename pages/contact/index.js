// Package imports
import { useState } from "react";
import Link from "next/link";
// Serverside
import { completeMessagesTree } from "@/utils/i18n";
// Fetch wrapper
import fido from "@/utils/fido";
// Styles
import styles from "@/styles/pages/contact.module.css";
// Components
import PageLayout from "@/components/global/PageLayout";
import TextInput from "@/components/global/TextInput";
import TextArea from "@/components/global/TextArea";
import SelectInput from "@/components/global/SelectInput";
import FieldSet from "@/components/global/FieldSet";
import RadioInput from "@/components/global/RadioInput";
import CheckInput from "@/components/global/CheckInput";
import ErrorModal from "@/components/global/ErrorModal";

const selectOptions = [
  {
    key: "make",
    value: "I want you to create an App",
  },
  {
    key: "careers",
    value: "Give me a job plz",
  },
  {
    key: "bored",
    value: "I have nothing better to do",
  },
];

export const getServerSideProps = async ({ locale }) => {
  const messages = await completeMessagesTree(locale);
  return {
    props: {
      locale,
      messages,
      selectOptions,
    },
  };
};

export default function ContactPage() {
  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [reason, setReason] = useState(selectOptions[0].key);
  const [newsOptIn, setNewsOptIn] = useState("true");
  const [newsTypes, setNewsTypes] = useState([]);
  const [privacy, setPrivacy] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // state Handlers
  const [validationModalIsOpen, setValidationModallIsOpen] = useState(false);
  const [serverErrorModalIsOpen, setServerErrorModalIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [triggerSendingFail, setTriggerSendingFail] = useState(true);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    const formData = {
      name,
      email,
      emailConfirm,
      reason,
      newsOptIn,
      newsTypes,
      privacy,
      message,
      triggerSendingFail,
    };
    try {
      const errorCheck = await checkForErrors(formData);
      if (errorCheck.filter((e) => e != undefined) == 0) {
        setSubmitting(true);
        try {
          const res = await fido.post('/api/contact-form', formData)
          setSent(true);
          setSubmitting(false);

        } catch (e){
          if (e.response.status == 422) {
            setErrors(e.response.data.errors)
          }
          setServerErrorModalIsOpen(true);
          setSubmitting(false);
        }
      } else {
        // Set validation Errors
        setValidationModallIsOpen(true);
        let foundErrors = {};
        for (const [key, value] of Object.entries(
          errorCheck.filter((e) => e != undefined)
        )) {
          foundErrors = { ...foundErrors, ...value };
        }
        setErrors({ ...foundErrors });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const checkForErrors = async (formData) => {
    const checkNewsTypes = new Promise((resolve) => {
      if (formData.newsOptIn == "true") {
        newsTypes.length > 0
          ? resolve()
          : resolve({ pick_some_news: "You haven't chosen any news types!" });
      }
      resolve();
    });

    const checkEmailsMatch = new Promise((resolve) => {
      if (email != emailConfirm) {
        resolve({ email_confirmation: "The emails you entered don't match!" });
      }
      resolve();
    });

    try {
      const res = await Promise.all([checkEmailsMatch, checkNewsTypes]);
      return res;
    } catch (e) {
      return e;
    }
  };

  const handleEmailMatch = (e) => {
    if (emailConfirm != email)
      setErrors({
        ...errors,
        email_confirmation: "The emails you entered don't match!",
      });
    else {
      let revisedErrors = { ...errors };
      delete revisedErrors.email_confirmation;
      setErrors({ ...revisedErrors });
    }
  };

  const handleNewsTypes = (e) => {
    const value = e.target.value;
    if (e.target.checked) setNewsTypes([...newsTypes, value]);
    else {
      setNewsTypes([...newsTypes.filter((n) => n != value)]);
    }
  };

  return (
    <PageLayout>
      <div className="container">
        {!submitting && !sent && (
          <>
            <form onSubmit={handleSubmit} className={styles["contact-form"]}>
              <h1>Contact us</h1>
              <TextInput
                htmlFor="name"
                label="Your Name"
                onInput={(e) => setName(e.target.value)}
                value={name}
                required
              />

              <TextInput
                htmlFor="email"
                label="Your Email"
                onInput={(e) => setEmail(e.target.value)}
                type="email"
                required
                value={email}
              />

              <TextInput
                htmlFor="confirm_email"
                label="Confirm Email"
                onBlur={handleEmailMatch}
                onInput={(e) => setEmailConfirm(e.target.value)}
                type="email"
                required
                error={errors.email_confirmation ?? null}
                value={emailConfirm}
              />

              <SelectInput
                onChange={(e) => setReason(e.target.value)}
                options={selectOptions}
                htmlFor="reason"
                label="What do you want?"
                value={reason}
              />

              <TextArea
                onInput={(e) => setMessage(e.target.value)}
                className={styles["contact-form__textarea"]}
                placeholder="Start typing..."
                value={message}
                required
              />

              <h2>Want News?</h2>
              <p>
                If you want to see client form validation fail, sign up for the
                newsletter, but don't choose and news types.
              </p>

              <FieldSet legend="Would you like to receive our newsletter?">
                <RadioInput
                  onChange={(e) => setNewsOptIn(e.target.value)}
                  value={true}
                  name="news"
                  label="Yes, Sign me up"
                  checked={newsOptIn == "true"}
                />
                <RadioInput
                  onChange={(e) => {
                    setNewsOptIn(e.target.value);
                  }}
                  value={false}
                  name="news"
                  label="No, Thank you"
                />
              </FieldSet>

              {newsOptIn == "true" && (
                <FieldSet
                  legend="What kind of news do you want to receive?"
                  error={errors.pick_some_news ?? null}
                >
                  <CheckInput
                    onChange={handleNewsTypes}
                    value="marketing"
                    label="Marketing material"
                    checked={newsTypes.includes("marketing")}
                  />
                  <CheckInput
                    onChange={handleNewsTypes}
                    value="careers"
                    label="Job opportunities"
                    checked={newsTypes.includes("careers")}
                  />
                  <CheckInput
                    onChange={handleNewsTypes}
                    value="memes"
                    label="Memes we think are funny"
                    checked={newsTypes.includes("memes")}
                  />
                </FieldSet>
              )}

              <CheckInput
                className={styles["privacy"]}
                onChange={() => setPrivacy(!privacy)}
                value="true"
                label={
                  <>
                    I agree to the {<Link href="/">Privacy Policy</Link>} I
                    haven't read
                  </>
                }
                checked={privacy}
                required
              />

              {Object.entries(errors).length > 0 && (
                <div className={styles['errors']}>
                  <h3>Fix these Errors:</h3>
                  <ul>
                    {Object.values(errors).map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button className="btn" type="submit">
                Submit
              </button>

              <CheckInput
                value="true"
                onChange={() => setTriggerSendingFail(!triggerSendingFail)}
                label={
                  <>
                    Trigger Sending failure (to test what happens if fetch post
                    fails)
                  </>
                }
                checked={triggerSendingFail}
              />
            </form>
            <ErrorModal
              isOpen={validationModalIsOpen}
              closeModal={() => setValidationModallIsOpen(false)}
              title="Validation Failed!"
              message="There were errors in your submission. Fix them and try again"
            />
            <ErrorModal
              isOpen={serverErrorModalIsOpen}
              closeModal={() => setServerErrorModalIsOpen(false)}
              title="Something went wrong!"
              message="We weren't able to process your request for whtever reason, please try again."
            />
          </>
        )}
        {submitting && (
          <div className="copy-block">
            <p>Submitting form...</p>
          </div>
        )}
        {sent && (
          <div className="copy-block">
            <h3>Thank you for your message!</h3>
            <p>
              We probably won't be in touch because this is a fake form and it
              doesn't go anywhere.
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
