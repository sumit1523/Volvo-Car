import { NextResponse } from "next/server";
import cars from "./../../../../public/api/cars.json";

export async function GET() {
  return NextResponse.json(cars);
}
