import { getAllContacts } from "@/lib/queries";
import ContactsTable from "./ContactsTable";

export const metadata = { title: "Contacts | Admin" };

export default async function AdminContactsPage() {
  const contacts = await getAllContacts();

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontFamily: "var(--font-bebas),'Bebas Neue',cursive",
            fontSize: 40,
            letterSpacing: "0.04em",
            color: "#fff",
            marginBottom: 4,
          }}
        >
          CONTACTS
        </h1>
        <p style={{ color: "#A1A1AA", fontSize: 13 }}>
          {contacts.length} message{contacts.length !== 1 ? "s" : ""} received
        </p>
      </div>

      <ContactsTable initialContacts={contacts} />
    </div>
  );
}
