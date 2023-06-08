import PageLayout from "@/components/global/PageLayout";
import { completeMessagesTree } from "@/utils/i18n";
import TextInput from "@/components/global/TextInput";
import TextArea from "@/components/global/TextArea";
import SelectInput from "@/components/global/SelectInput";
import FieldSet from "@/components/global/FieldSet";
import RadioInput from "@/components/global/RadioInput";
import CheckInput from "@/components/global/CheckInput";
import { useState } from "react";
import styles from "@/styles/pages/contact.module.css";
import Link from "next/link";
import fido from "@/utils/fido";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [reason, setReason] = useState(selectOptions[0].key);
  const [newsOptIn, setNewsOptIn] = useState("true");
  const [newsTypes, setNewsTypes] = useState([]);
  const [privacy, setPrivacy] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

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
    };
    try {
        const errorCheck = await checkForErrors(formData);
        if (errorCheck.filter((e) => e != undefined) == 0) {
            console.log(formData)
        } 
        else {
            // Set Errors
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
        <form onSubmit={handleSubmit} className={styles["contact-form"]}>
          <h1>Contact us</h1>
          <TextInput
            htmlFor="name"
            label="Your Name"
            onInput={(e) => setName(e.target.value)}
            // required
          />

          <TextInput
            htmlFor="email"
            label="Your Email"
            onInput={(e) => setEmail(e.target.value)}
            type="email"
            required
          />

          <TextInput
            htmlFor="confirm_email"
            label="Confirm Email"
            onBlur={handleEmailMatch}
            onInput={(e) => setEmailConfirm(e.target.value)}
            type="email"
            required
            error={errors.email_confirmation ?? null}
          />

          <SelectInput
            onChange={(e) => setReason(e.target.value)}
            options={selectOptions}
            htmlFor="reason"
            label="What do you want?"
          />

          <FieldSet legend="Would you like to receive our newsletter?">
            <RadioInput
              onChange={(e) => setNewsOptIn(e.target.value)}
              value={true}
              name="news"
              label="Yes, Sign me up"
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

          <TextArea
            onInput={(e) => setMessage(e.target.value)}
            className={styles["contact-form__textarea"]}
            placeholder="Start typing..."
            value={message}
            // required
          />

          <CheckInput
            className={styles["privacy"]}
            onChange={() => setPrivacy(!privacy)}
            value="true"
            label={
              <>
                I agree to the {<Link href="/">Privacy Policy</Link>} I haven't
                read
              </>
            }
            required
          />

          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </PageLayout>
  );
}
