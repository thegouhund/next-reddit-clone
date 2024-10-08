import { faker } from "@faker-js/faker";
import { User } from "@models/index";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface GoogleUserData {
  name: string;
  email: string;
  picture: string;
}

export const POST = async (request: NextRequest) => {
  try {
    const { credential } = await request.json();
    const userData = jwtDecode(credential) as GoogleUserData;

    let user = await User.findOne({ where: { email: userData.email } });
    if (!user) {
      const username = `${faker.word.adjective()}${faker.person.firstName().replace(/\W/, "")}${faker.number.int(99)}`;

      user = await User.create({
        username,
        email: userData.email,
      });
    }

    const payload = {
      id: user.getDataValue("id"),
      email: user.getDataValue("email"),
      username: user.getDataValue("username"),
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 },
    );
  }
};
