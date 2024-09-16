import { faker } from '@faker-js/faker';
import { Comment, Post } from "./model/index";
import { Subbedit } from "./model/index";
import { User } from "./model/index";
import { PostModel, SubbeditModel, UserModel } from '../types/model';

const subbedit = {
    name: faker.lorem.word(),
}

const user = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
};

const post = {
    title: faker.lorem.sentence(),
    body: faker.lorem.sentence(),
    userId: 1,
    subbeditId: 1,
};

(async () => {
    await Subbedit.create(subbedit);
    await User.create(user);
    await Post.create(post);

    for (let i = 0; i < 5; i++) {
        const subbedit = await Subbedit.create({
            name: faker.lorem.word(),
        });

        const user = await User.create({
            username: faker.internet.userName(),
            email: faker.internet.email(),
        });

        for (let j = 0; j < 5; j++) {
            const post = await Post.create({
                title: faker.lorem.sentence(),
                body: faker.lorem.paragraphs(),
                userId: user.getDataValue('id'),
                subbeditId: subbedit.getDataValue('id'),
            });

            for (let k = 0; k < 10; k++) {
                const comment = await Comment.create({
                    body: faker.lorem.sentence(),
                    userId: user.getDataValue('id'),
                    postId: post.getDataValue('id'),
                    parentCommentId: null,
                });

                for (let l = 0; l < 2; l++) {
                    const childComment = await Comment.create({
                        body: faker.lorem.sentence(),
                        userId: user.getDataValue('id'),
                        postId: post.getDataValue('id'),
                        parentCommentId: comment.getDataValue('id'),
                    });

                    for (let m = 0; m < 2; m++) {
                        await Comment.create({
                            body: faker.lorem.sentence(),
                            userId: user.getDataValue('id'),
                            postId: post.getDataValue('id'),
                            parentCommentId: childComment.getDataValue('id'),
                        });
                    }
                }
            }
        }
    }
})();