-- Sample prayer goals to insert into the database
-- Run these SQL commands in your D1 database to add sample prayer goals

INSERT INTO prayer_goals (title, description, category, created_at) VALUES 
('Health & Healing', 'Prayers for physical and mental health, recovery from illness, and overall well-being', 'Health', datetime('now')),
('Family & Relationships', 'Prayers for family unity, relationships, marriage, and children', 'Family', datetime('now')),
('Career & Work', 'Prayers for job opportunities, career growth, workplace relationships, and financial stability', 'Career', datetime('now')),
('Spiritual Growth', 'Prayers for deeper faith, understanding of God, and spiritual maturity', 'Spiritual', datetime('now')),
('Peace & Guidance', 'Prayers for wisdom, decision-making, and finding peace in difficult situations', 'Guidance', datetime('now')),
('Community & World', 'Prayers for local community, world peace, and global issues', 'Community', datetime('now'));
