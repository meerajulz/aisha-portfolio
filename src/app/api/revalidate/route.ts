import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity calls this on publish. Cached pages invalidate by tag and the change
 * is live in seconds — no rebuild, no deploy.
 *
 * Set up in Sanity: API > Webhooks > Create webhook
 *   URL:     https://yoursite.com/api/revalidate
 *   Trigger: Create, Update, Delete
 *   Filter:  _type in ["page","project","class","navigation","siteSettings"]
 *   Secret:  same value as SANITY_REVALIDATE_SECRET
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string; _id: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }
    if (!body?._type) {
      return new NextResponse("Bad request", { status: 400 });
    }

    revalidateTag(body._type);
    revalidateTag(`${body._type}:${body._id}`);

    return NextResponse.json({ revalidated: true, type: body._type });
  } catch (err) {
    return new NextResponse((err as Error).message, { status: 500 });
  }
}
