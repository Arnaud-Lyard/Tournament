import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  /* Reset the database */
  await prisma.categoriesOnPosts.deleteMany();
  await prisma.postsOnUsers.deleteMany();
  await prisma.post.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  /* Seed the database */

  /* Users */
  const arnaud = await prisma.user.upsert({
    where: { id: '1a751e3a-8884-4f29-98d7-81d3f5cbc712' },
    update: {},
    create: {
      username: 'arnaud',
      email: 'arnaud@prisma.io',
      verified: true,
      password: '$2a$12$xYBCgHdaMowt7h20gh0EAOVqEFxyMJUssm/KTwUEDCZAQ9SENSbZ6',
      role: 'admin',
      notification: true,
      verificationCode: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      passwordResetToken: null,
      passwordResetAt: null,
    },
  });

  const bob = await prisma.user.upsert({
    where: { id: '486eb3da-ffb3-40f0-91a3-11f7b19a6a39' },
    update: {},
    create: {
      username: 'bob',
      email: 'bob@prisma.io',
      password: '$2a$12$xYBCgHdaMowt7h20gh0EAOVqEFxyMJUssm/KTwUEDCZAQ9SENSbZ6',
      role: 'user',
      notification: true,
      verificationCode: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      passwordResetToken: null,
      passwordResetAt: null,
    },
  });

  const john = await prisma.user.upsert({
    where: { id: 'e3386a0b-703a-49bd-a600-532ddd2221e1' },
    update: {},
    create: {
      username: 'john',
      email: 'john@prisma.io',
      password: '$2a$12$xYBCgHdaMowt7h20gh0EAOVqEFxyMJUssm/KTwUEDCZAQ9SENSbZ6',
      role: 'user',
      notification: true,
      verificationCode: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      passwordResetToken: null,
      passwordResetAt: null,
    },
  });

  const mat = await prisma.user.upsert({
    where: { id: '9035c9e7-9c88-4595-96a0-b2e5064a36f5' },
    update: {},
    create: {
      username: 'mat',
      email: 'mat@prisma.io',
      password: '$2a$12$xYBCgHdaMowt7h20gh0EAOVqEFxyMJUssm/KTwUEDCZAQ9SENSbZ6',
      role: 'user',
      notification: true,
      verificationCode: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      passwordResetToken: null,
      passwordResetAt: null,
    },
  });

  const mich = await prisma.user.upsert({
    where: { id: '1a751e3a-8884-4f29-98d7-81d3f5cbc713' },
    update: {},
    create: {
      username: 'mich',
      email: 'mich@prisma.io',
      verified: true,
      password: '$2a$12$xYBCgHdaMowt7h20gh0EAOVqEFxyMJUssm/KTwUEDCZAQ9SENSbZ6',
      role: 'user',
      notification: false,
      verificationCode: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      passwordResetToken: null,
      passwordResetAt: null,
    },
  });

  const elo = await prisma.user.upsert({
    where: { id: 'b3aca0e8-0be4-4ad0-bc3f-c3ca72c1f5b3' },
    update: {},
    create: {
      username: 'user',
      email: 'elo@prisma.io',
      verified: true,
      password: '$2a$12$xYBCgHdaMowt7h20gh0EAOVqEFxyMJUssm/KTwUEDCZAQ9SENSbZ6',
      role: 'user',
      verificationCode: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      passwordResetToken: null,
      passwordResetAt: null,
    },
  });

  /* Categories */
  const category1 = await prisma.category.upsert({
    where: { id: '1a751e3a-8884-4f29-98d7-81d3f5cbc711' },
    update: {},
    create: {
      name: 'Category 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const category2 = await prisma.category.upsert({
    where: { id: '1a751e3a-8884-4f29-98d7-81d3f5cbc712' },
    update: {},
    create: {
      name: 'Category 2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const category3 = await prisma.category.upsert({
    where: { id: '1a751e3a-8884-4f29-98d7-81d3f5cbc713' },
    update: {},
    create: {
      name: 'Category 3',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  /* Posts */
  const defaultPostImage = 'host-virtual-private-server.png';
  const defaultFrenchPostContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse urna lorem, ullamcorper ac libero quis, tempor sollicitudin orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam at enim nec nibh tempus fringilla a ut lectus. Sed dictum bibendum arcu. Aenean euismod, dolor a vehicula scelerisque, nunc ante pulvinar massa, ut interdum leo lorem vitae dolor. Curabitur porttitor felis sem, ac varius lacus elementum nec. Quisque molestie leo eu dui pellentesque, eu pretium sem lobortis. Praesent vitae fringilla magna. Ut at lacus turpis. Cras cursus convallis egestas. Nullam sodales mi et erat posuere porta.';
  const defaultEnglishPostContent =
    'Nam nec lorem ultricies, ultricies justo sit amet, luctus ligula. Pellentesque sed lobortis nulla. Phasellus lobortis velit tempor, congue eros at, blandit neque. Donec pretium leo arcu, et convallis massa sodales ut. Quisque euismod eu mi sed aliquet. Aliquam sit amet porttitor ante. Integer rutrum et metus at semper. Sed consequat risus eu ornare porta. Nunc vitae tortor quam. Pellentesque in nibh erat. Morbi egestas ante tellus, id venenatis nibh bibendum sit amet. Etiam at dolor a augue accumsan porta et vitae diam.';

  const post1 = await prisma.post.upsert({
    where: { id: '603922a6-ea63-473f-a714-a5e9ce42b15e' },
    update: {},
    create: {
      frenchTitle: 'Post 1',
      englishTitle: 'Post 1',
      frenchDescription: 'Description du post 1',
      englishDescription: 'Description of post 1',
      frenchContent: defaultFrenchPostContent,
      englishContent: defaultEnglishPostContent,
      slug: 'post-1',
      image: defaultPostImage,
      status: 'published',
      user: {
        connect: { id: arnaud.id },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const post2 = await prisma.post.upsert({
    where: { id: '603922a6-ea63-473f-a714-a5e9ce42b15f' },
    update: {},
    create: {
      frenchTitle: 'Post 2',
      englishTitle: 'Post 2',
      frenchDescription: 'Description du post 2',
      englishDescription: 'Description of post 2',
      frenchContent: defaultFrenchPostContent,
      englishContent: defaultEnglishPostContent,
      slug: 'post-2',
      image: defaultPostImage,
      status: 'published',
      user: {
        connect: { id: arnaud.id },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const post3 = await prisma.post.upsert({
    where: { id: '717cbfc5-d10b-46f4-b0c7-243d0788b462' },
    update: {},
    create: {
      frenchTitle: 'Post 3',
      englishTitle: 'Post 3',
      frenchDescription: 'Description du post 3',
      englishDescription: 'Description of post 3',
      frenchContent: defaultFrenchPostContent,
      englishContent: defaultEnglishPostContent,
      slug: 'post-3',
      image: defaultPostImage,
      status: 'published',
      user: {
        connect: { id: arnaud.id },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const post4 = await prisma.post.upsert({
    where: { id: '603922a6-ea63-473f-a714-a5e9ce42b15f' },
    update: {},
    create: {
      frenchTitle: 'Post 4',
      englishTitle: 'Post 4',
      frenchDescription: 'Description du post 4',
      englishDescription: 'Description of post 4',
      frenchContent: defaultFrenchPostContent,
      englishContent: defaultEnglishPostContent,
      slug: 'post-4',
      image: defaultPostImage,
      status: 'published',
      user: {
        connect: { id: arnaud.id },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const post5 = await prisma.post.upsert({
    where: { id: '603922a6-ea63-473f-a714-a5e9ce42b15f' },
    update: {},
    create: {
      frenchTitle: 'Post 5',
      englishTitle: 'Post 5',
      frenchDescription: 'Description du post 5',
      englishDescription: 'Description of post 5',
      frenchContent: defaultFrenchPostContent,
      englishContent: defaultEnglishPostContent,
      slug: 'post-5',
      image: defaultPostImage,
      status: 'draft',
      user: {
        connect: { id: arnaud.id },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  /* Posts on categories */
  const category1OnPost1 = await prisma.categoriesOnPosts.create({
    data: {
      category: {
        connect: { id: category1.id },
      },
      post: {
        connect: { id: post1.id },
      },
    },
  });
  const category2OnPost1 = await prisma.categoriesOnPosts.create({
    data: {
      category: {
        connect: { id: category2.id },
      },
      post: {
        connect: { id: post1.id },
      },
    },
  });
  const category3OnPost1 = await prisma.categoriesOnPosts.create({
    data: {
      category: {
        connect: { id: category3.id },
      },
      post: {
        connect: { id: post1.id },
      },
    },
  });

  /* Posts on users */
  const post1OnArnaud = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post1.id },
      },
      user: {
        connect: { id: arnaud.id },
      },
    },
  });

  const post2OnArnaud = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post2.id },
      },
      user: {
        connect: { id: arnaud.id },
      },
    },
  });

  const post3OnArnaud = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post3.id },
      },
      user: {
        connect: { id: arnaud.id },
      },
    },
  });

  const post4OnArnaud = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post4.id },
      },
      user: {
        connect: { id: arnaud.id },
      },
    },
  });

  const post5OnArnaud = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post5.id },
      },
      user: {
        connect: { id: arnaud.id },
      },
    },
  });

  const post1OnBob = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post1.id },
      },
      user: {
        connect: { id: bob.id },
      },
    },
  });

  const post2OnBob = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post2.id },
      },
      user: {
        connect: { id: bob.id },
      },
    },
  });

  const post3OnBob = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post3.id },
      },
      user: {
        connect: { id: bob.id },
      },
    },
  });

  const post4OnBob = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post4.id },
      },
      user: {
        connect: { id: bob.id },
      },
    },
  });

  const post5OnBob = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post5.id },
      },
      user: {
        connect: { id: bob.id },
      },
    },
  });

  const post1OnJohn = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post1.id },
      },
      user: {
        connect: { id: john.id },
      },
    },
  });

  const post2OnJohn = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post2.id },
      },
      user: {
        connect: { id: john.id },
      },
    },
  });

  const post3OnJohn = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post3.id },
      },
      user: {
        connect: { id: john.id },
      },
    },
  });

  const post4OnJohn = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post4.id },
      },
      user: {
        connect: { id: john.id },
      },
    },
  });

  const post5OnJohn = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post5.id },
      },
      user: {
        connect: { id: john.id },
      },
    },
  });

  const post1OnMat = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post1.id },
      },
      user: {
        connect: { id: mat.id },
      },
    },
  });

  const post2OnMat = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post2.id },
      },
      user: {
        connect: { id: mat.id },
      },
    },
  });

  const post3OnMat = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post3.id },
      },
      user: {
        connect: { id: mat.id },
      },
    },
  });

  const post4OnMat = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post4.id },
      },
      user: {
        connect: { id: mat.id },
      },
    },
  });

  const post5OnMat = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post5.id },
      },
      user: {
        connect: { id: mat.id },
      },
    },
  });

  const post1OnMich = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post1.id },
      },
      user: {
        connect: { id: mich.id },
      },
    },
  });

  const post2OnMich = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post2.id },
      },
      user: {
        connect: { id: mich.id },
      },
    },
  });

  const post3OnMich = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post3.id },
      },
      user: {
        connect: { id: mich.id },
      },
    },
  });

  const post4OnMich = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post4.id },
      },
      user: {
        connect: { id: mich.id },
      },
    },
  });

  const post5OnMich = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post5.id },
      },
      user: {
        connect: { id: mich.id },
      },
    },
  });

  const post1OnElo = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post1.id },
      },
      user: {
        connect: { id: elo.id },
      },
    },
  });

  const post2OnElo = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post2.id },
      },
      user: {
        connect: { id: elo.id },
      },
    },
  });

  const post3OnElo = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post3.id },
      },
      user: {
        connect: { id: elo.id },
      },
    },
  });

  const post4OnElo = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post4.id },
      },
      user: {
        connect: { id: elo.id },
      },
    },
  });

  const post5OnElo = await prisma.postsOnUsers.create({
    data: {
      post: {
        connect: { id: post5.id },
      },
      user: {
        connect: { id: elo.id },
      },
    },
  });

  console.log('-----------------Users-----------------');
  console.log({ arnaud, bob, john, mat, mich, elo });

  console.log('-----------------Categories-----------------');
  console.log({ category1, category2, category3 });

  console.log('-----------------Posts on categories-----------------');
  console.log({ category1OnPost1, category2OnPost1, category3OnPost1 });

  console.log('-----------------Posts-----------------');
  console.log({ post1, post2, post3, post4, post5 });

  console.log('-----------------Posts on users-----------------');
  console.log({
    post1OnArnaud,
    post2OnArnaud,
    post3OnArnaud,
    post4OnArnaud,
    post5OnArnaud,
    post1OnBob,
    post2OnBob,
    post3OnBob,
    post4OnBob,
    post5OnBob,
    post1OnJohn,
    post2OnJohn,
    post3OnJohn,
    post4OnJohn,
    post5OnJohn,
    post1OnMat,
    post2OnMat,
    post3OnMat,
    post4OnMat,
    post5OnMat,
    post1OnMich,
    post2OnMich,
    post3OnMich,
    post4OnMich,
    post5OnMich,
    post1OnElo,
    post2OnElo,
    post3OnElo,
    post4OnElo,
    post5OnElo,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
