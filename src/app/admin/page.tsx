import { redirect } from "next/navigation";

const basePath = process.env.NODE_ENV === "production" ? "/lkz-site" : "";

export default function AdminPage() {
  redirect(`${basePath}/admin/products`);
}
