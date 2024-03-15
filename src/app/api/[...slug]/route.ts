import { processNoAuth } from "@/utils/http";
import next from "next";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

const url =
  process.env.NODE_ENV === "production"
    ? "https://api.fundit.com.ng"
    : "http://localhost:3800";
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const reqUrl = new URL(request.url);
  console.log("reqUrl -->", reqUrl, "params -->", params);
  const search = reqUrl.search;
  const pathname = reqUrl.pathname;
  const constructedPath = pathname.replace("/api/", "");
  const withSearch = `${constructedPath}${search}`;
  const token = request.headers.get("Authorization");
  console.log("url -->", url, "path -->", constructedPath);
  try {
    const getData = await fetch(
      `${url}/${withSearch ? withSearch : constructedPath}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
      }
    );
    const data = await getData.json();
    console.log(data, "data -->");

    return new Response(JSON.stringify(data), {
      status: data.status || data.statusCode,
    });
  } catch (e) {
    console.log("error -->",e);
    return NextResponse.json(e);
  }
}

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  const reqUrl = new URL(request.url);
  const pathname = reqUrl.pathname;
  const search = reqUrl.search;
  const body = await request.json();
  const token = request.headers.get("Authorization");
  console.log("token -->", token);
  const constructedPath = pathname.replace("/api/", "");
  const withSearch = `${constructedPath}${search}`;

  try {
    const res = await fetch(
      `${url}/${withSearch ? withSearch : constructedPath}`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
      }
    );
    const data = await res.json();
    console.log("data -->", data);
    return new Response(JSON.stringify(data), {
      status: data.status || data.statusCode,
    });
  } catch (e: any) {
    console.log("error -->", e);
    return NextResponse.json({ error: e.message }, { status: e.statusCode });
  }
}
export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  const reqUrl = new URL(request.url);
  const pathname = reqUrl.pathname;
  const search = reqUrl.search;
  const body = await request.json();
  const constructedPath = pathname.replace("/api/", "");
  const withSearch = `${constructedPath}${search}`;

  try {
    const getData = await fetch(
      `${url}/${withSearch ? withSearch : constructedPath}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (getData.status === 401 && getData.statusText === "Unauthorized") {
      redirect("http://localhost:3000");
    }
    const data = await getData.json();
    return NextResponse.json(data);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
}
export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  const reqUrl = new URL(request.url);
  const pathname = reqUrl.pathname;
  const search = reqUrl.search;
  const constructedPath = pathname.replace("/api/", "");
  const withSearch = `${constructedPath}${search}`;

  const getData = await fetch(
    `${url}/${withSearch ? withSearch : constructedPath}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (getData.status === 401 && getData.statusText === "Unauthorized") {
    redirect("/login");
  }
  const data = await getData.json();

  return NextResponse.json(data);
}
export async function PATCH() {}

export const dynamic = "force-dynamic";
