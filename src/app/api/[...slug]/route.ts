import { getResponseErrorMessage } from "@/utils/data-utils";
import { processNoAuth } from "@/utils/http";
import axios, { AxiosError } from "axios";
import next from "next";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

// const url =
//   process.env.NODE_ENV === "production"
//     ? "https://api.fundit.com.ng"
//     : "http://localhost:3800";
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
  console.log(
    "url -->",
    url,
    "path -->",
    constructedPath,
    "with search",
    withSearch
  );
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
    // console.log(data, "data -->");

    return new Response(JSON.stringify(data), {
      status: data.status || data.statusCode,
    });
  } catch (e: any) {
    const error = JSON.stringify(e);
    const parsedError = JSON.parse(error);
    console.log("error -->", JSON.stringify(e), parsedError);
    if (parsedError.cause.code === "ECONNREFUSED") {
      return new Response(JSON.stringify({ error: "Network Error" }), {
        status: 500,
      });
    }
    return NextResponse.json({ error: e.message }, { status: e.statusCode });
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
  const contentType = request.headers.get("Content-Type");
  const search = reqUrl.search;
  const isMultipart = contentType?.includes("multipart/form-data");
  const body = isMultipart
    ? await request.formData()
    : contentType?.includes("application/json")
    ? await request.json()
    : null;
  console.log("body -->", body);
  const token = request.headers.get("Authorization");
  console.log("token -->", token);
  const constructedPath = pathname.replace("/api/", "");
  const withSearch = `${constructedPath}${search}`;
  console.log("contentType -->", contentType);
  try {
    const res = await axios.post(
      `${url}/${withSearch ? withSearch : constructedPath}`,
      isMultipart ? body : JSON.stringify(body),
      {
        headers: {
          "Content-Type": contentType || "application/json",
          Authorization: token || "",
        },
        withCredentials: true,
      }
    );
    const data = await res.data;
    console.log("data -->", data);
    return new Response(JSON.stringify(data), {
      status: data.status || data.statusCode,
    });
  } catch (e: any) {
    const error = getResponseErrorMessage(e);
     console.log("error here -->", error);

    return new Response(JSON.stringify({ ...e.response.data }), {
      status: e.response.data.statusCode || 500,
    });
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
